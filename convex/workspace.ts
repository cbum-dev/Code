import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { query } from "./_generated/server";

export const CreateWorkspace = mutation({
    args:{
        message:v.any(),
        user:v.id('users')
    },
    handler:async(ctx,args)=> {
        const result = await ctx.db.insert('workspace',{
            message:args.message,
            user:args.user,
            fileData:{}
        })
        return result;
    }

})

export const GetWorkspace = query({
    args:{
        workspaceId:v.id('workspace')
    },
    handler:async(ctx,args)=>{
        const result = await ctx.db.get(args.workspaceId);
        return result
    }
})

export const GetWorkspaceTop10 = query({
    args: {},
    handler: async (ctx) => {
      const workspaces = await ctx.db.query("workspace").take(10);
      return Promise.all(
        workspaces.map(async (workspace) => {
          const user = await ctx.db.get(workspace.user);
          return {
            ...workspace,
            userName: user?.name, 
            userEmail: user?.email,
            userImage: user?.picture
          };
        })
      );
    },
  });

export const UpdateMessages = mutation({
  args:{
    workspaceId : v.id('workspace'),
    message: v.any()
  },
  handler:async(ctx,args) => {
    const result = await ctx.db.patch(args.workspaceId , {
      message : args.message
    })
    return result;
  }
})

export const UpdateFiles = mutation({
  args:{
    workspaceId : v.id('workspace'),
    files: v.optional(v.any())
  },
  handler:async(ctx,args) => {
    const result = await ctx.db.patch(args.workspaceId , {
      fileData : args.files
    })
    return result;
  }
})