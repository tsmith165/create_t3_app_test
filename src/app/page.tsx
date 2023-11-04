'use client'

import React, { useEffect, useState } from 'react';
import GameItem from './_components/GameItem';

const HomePage: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/trpc/item/getAllRecipes');
        const data = await response.json();
        setRecipes(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    console.log('Component mounted.  Fetching recipes...')
    fetchRecipes();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-bold">Game Recipes</h1>
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
              src={recipe.craftedItem.image_url}
              alt={recipe.craftedItem.name}
              itemStats={`Stats: ${JSON.stringify(recipe.craftedItem.stats)}, Attributes: ${recipe.craftedItem.attributes}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
