import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signinInput,signupInput } from "@havoncom/medium-model";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    userId:string
  }
}>();

userRouter.use("/me", async (c, next) => {
  try {
    const header = c.req.header("Authorization") || "";
    console.log(header);
    if (!header) return next();
    const user = await verify(header, c.env.JWT_SECRET);
    if (user) {
      //@ts-ignore
      c.set("userId", user.id);
      return next();
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (error) {
    return c.text("invalid");
  }
});

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  console.log(body)
  const {success} = signupInput.safeParse(body);
  console.log(success)
  if(!success){
    c.status(411);
    return c.json({
      message:"invalid signup input"
    })
  }
  try {
    const user = await prisma.user.create({
      data: {
        name:body.name,
        email: body.email,
        password: body.password,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    console.log(token);
    return c.json({
      jwt: token,
    });
  } catch (error) {
    return c.text("invalid");
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success} = signinInput.safeParse(body);
  if(!success)
    {
      c.status(411);
      return c.json({
        message:"invalid signin inputs"
      })
    }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403); //nnauthorized access
      return c.json({ error: "user not found" });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (error) {
    return c.text("invalid");
  }
});

userRouter.get("/me",async(c)=>
{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authorId = c.get("userId");
  console.log(authorId)
  try {
    const user = await prisma.user.findFirst({
      where:{
        id:authorId
      },
      select:{
        id:true,
        name:true,
        email:true
      }
    });
    c.status(200);
    return c.json({
      message: "user fetched successfully",
      user
    });
  } catch (error) {
    return c.text("invalid");
  }
})
