
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Recipe } from '../types/nutrition';

const RecipeManager = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('nutritionRecipes') || '[]');
    setRecipes(savedRecipes);
  }, []);

  const deleteRecipe = (recipeId: string) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== recipeId);
    setRecipes(updatedRecipes);
    localStorage.setItem('nutritionRecipes', JSON.stringify(updatedRecipes));
    
    if (selectedRecipe?.id === recipeId) {
      setSelectedRecipe(null);
    }
    
    toast({
      title: "Recipe Deleted",
      description: "Recipe has been removed from your collection",
    });
  };

  const viewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(selectedRecipe?.id === recipe.id ? null : recipe);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-smartfood-600" />
            <span>Recipe Manager</span>
          </CardTitle>
          <CardDescription>
            View and manage your saved recipes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recipes.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No recipes saved yet. Create some recipes in the Nutrition Calculator!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recipes.map((recipe) => (
                <div key={recipe.id} className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-smartfood-50 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{recipe.name}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="secondary">
                          {recipe.ingredients.length} ingredients
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {recipe.totalNutrition.calories.toFixed(0)} calories
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Created: {new Date(recipe.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewRecipe(recipe)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteRecipe(recipe.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {selectedRecipe?.id === recipe.id && (
                    <Card className="ml-4">
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Ingredients:</h4>
                            <div className="space-y-1">
                              {recipe.ingredients.map((ingredient, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span>{ingredient.name}</span>
                                  <span>{ingredient.quantity}g</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-smartfood-600">
                                {recipe.totalNutrition.calories.toFixed(0)}
                              </div>
                              <div className="text-xs text-muted-foreground">Calories</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-smartfood-600">
                                {recipe.totalNutrition.protein.toFixed(1)}g
                              </div>
                              <div className="text-xs text-muted-foreground">Protein</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-smartfood-600">
                                {recipe.totalNutrition.carbs.toFixed(1)}g
                              </div>
                              <div className="text-xs text-muted-foreground">Carbs</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-smartfood-600">
                                {recipe.totalNutrition.fat.toFixed(1)}g
                              </div>
                              <div className="text-xs text-muted-foreground">Fat</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipeManager;
