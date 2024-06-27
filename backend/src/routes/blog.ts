import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@havoncom/medium-model";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();
blogRouter.use("/*", async (c, next) => {
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
blogRouter.post("/post", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "invalid create blog inputs",
    });
  }
  const authorId = c.get("userId");
  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: String(authorId),
      },
    });
    c.status(200);
    return c.json({
      message: "blog created",
      blog,
    });
  } catch (error) {
    return c.text("invalid");
  }
});

blogRouter.put("/update", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body);
  if(!success)
    {
      c.status(411)
      return c.json({
        message:"invalid update blog inputs"
      })
    }
  try {
    const blog = await prisma.blog.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      message: "blog updated",
      id: blog.id,
    });
  } catch (error) {
    c.status(401);
    return c.text("invalid");
  }
});

blogRouter.get("/get/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: String(id),
      },
      select:{
        id:true,
        content:true,
        title:true,
        author:{
          select:{
            name:true
          }
        }
      }
    });
    return c.json({
      blog,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      message: "error while fetching blog",
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    select:{
      id:true,
      content:true,
      title:true,
      author:{
        select:{
          name:true,
          id:true
        }
      }
    }
  });

  return c.json({
    blogs,
  });
});

blogRouter.delete("/delete/:id",async(c)=>
{
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const response = await prisma.blog.delete({
      where:{
        id:id,
      }
    })
    c.status(200)
    return c.json({
      message:"blog delete successfully"
    })
  } catch (error) {
    c.status(404);
    return c.text("problem in deleting the post")
  }

})
