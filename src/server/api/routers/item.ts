import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { items, recipes } from "~/server/db/schema";

const newItemSchema = z.object({
    name: z.string(),
    type: z.string(),
    rarity: z.string(),
    cost: z.number(),
    image_url: z.string(),
    stats: z.string(),
    attributes: z.string(),
    effects: z.string(),
});

export const itemRouter = createTRPCRouter({
  getAllRecipes: publicProcedure
    .query(async ({ ctx }) => {
        const allRecipes = await ctx.db.select().from(recipes);
        const allItems = await ctx.db.select().from(items);
  
        return allRecipes.map(recipe => {
          const craftedItem = allItems.find(item => item.id === recipe.crafted_item_id);
          let recipeItems: typeof allItems = [];
          if (recipe.recipe_items) {
            recipeItems = recipe.recipe_items.split(',').map(id => 
              allItems.find(item => item.id === parseInt(id))!
            );
          }

          return { craftedItem, recipeItems };
        });
    }),
    createItem: publicProcedure
    .input(newItemSchema)
    .mutation(async ({ input, ctx }) => {
        const { name, type, rarity, cost, image_url, stats, attributes, effects } = input;
  
        await ctx.db.insert(items).values({
            name,
            type,
            rarity,
            cost,
            image_url,
            stats: JSON.parse(stats),
            attributes,
            effects: JSON.parse(effects),
          });
      }),
});
