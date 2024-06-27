import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@havoncom/medium-model";
import { use } from "hono/jsx";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

userRouter.use("/me/*", async (c, next) => {
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
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "invalid signup input",
    });
  }
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
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
    c.status(401);
    console.log(error);
    return c.text("invalidddd");
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  console.log(body);
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "invalid signin inputs",
    });
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

userRouter.get("/me", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authorId = c.get("userId");
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: authorId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    c.status(200);
    return c.json({
      message: "user fetched successfully",
      user,
    });
  } catch (error) {
    return c.text("invalid");
  }
});

userRouter.get("/me/blogs", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authorId = c.get("userId");
  try {
    const blogs = await prisma.user.findFirst({
      where: {
        id: authorId,
      },
      select: {
        blogs: true,
      },
    });
    c.status(200);
    return c.json( blogs );
  } catch (error) {
    c.status(401);
    return c.text("invalid request for blogs");
  }
});
userRouter.patch("/me/update",async(c)=>{
  const body = await c.req.json();
  console.log(body);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const authorId = c.get("userId");
 try {
   const response = await prisma.user.update({
     where:{
       id:authorId
     },
     data:{
       name:body.name,
       description:body.description
     },
     select:{
      name:true,
      description:true
     }
     
   })
   c.status(200);
   return c.json({
    response,
    message:"info updated"
   })
 } catch (error) {
  c.status(401);
  return c.text("something wrong in updating profile");
  
 }
})