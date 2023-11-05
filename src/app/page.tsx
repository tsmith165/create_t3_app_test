import React, { useEffect, useState } from 'react';
import GameItem from './_components/GameItem';
import { api } from "~/trpc/server";
import { items } from '~/server/db/schema';

type Item = typeof items['columns'];  // Type for an individual item
type Recipe = { craftedItem: Item | null; recipeItems: Item[] }; // Type for a recipe

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [newItem, setNewItem] = useState<Item>({
    name: '',
    type: '',
    rarity: '',
    cost: 0,
    image_url: '',
    stats: '{}',   // This may need further type refinement based on your schema
    attributes: '',
    effects: '{}',  // This may also need further type refinement
  });

  useEffect(() => {
    const fetchRecipes = async () => {
      const data = await api.item.getAllRecipes.query();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.item.createItem.mutate(newItem);
    // Refresh recipes
    const data = await api.item.getAllRecipes.query();
    setRecipes(data);
  };
  
  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Game Recipes</h1>

      {/* New item form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: <input name="name" value={newItem.name} onChange={handleChange} /></label>
        </div>
        {/* ... other fields (type, rarity, cost, image_url, stats, attributes, effects) */}
        <button type="submit">Add Item</button>
      </form>
      
      {recipes.map((recipe, i) => (
        <div key={i} className="flex mb-4">
          <div className="flex space-x-4">
            {recipe.recipeItems.map((item: any, j: any) => (
              <GameItem
                key={j}
                src={item.image_url}
                alt={item.name}
                itemStats={`Stats: ${JSON.stringify(item.stats)}, Attributes: ${item.attributes}`}
              />
            ))}
          </div>
          <div className="flex justify-center items-center">
            <span className="mx-4">→</span>
            <GameItem
              src={recipe.craftedItem?.image_url || ''}
              alt={recipe.craftedItem?.name || ''}
              itemStats={`Stats: ${JSON.stringify(recipe.craftedItem?.stats)}, Attributes: ${recipe.craftedItem?.attributes}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
