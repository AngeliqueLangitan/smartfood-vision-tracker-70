
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Calculator, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Ingredient, Recipe } from '../types/nutrition';
import { calculateTotalNutrition } from '../utils/nutritionCalculator';
import { ingredientDatabase } from '../data/ingredientDatabase';

const NutritionCalculator = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [recipeName, setRecipeName] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const { toast } = useToast();

  const addIngredient = () => {
    if (!selectedIngredient || !quantity) {
      toast({
        title: "Error",
        description: "Please select an ingredient and enter quantity",
        variant: "destructive"
      });
      return;
    }

    const baseIngredient = ingredientDatabase.find(ing => ing.name === selectedIngredient);
    if (!baseIngredient) return;

    const newIngredient: Ingredient = {
      ...baseIngredient,
      quantity: parseFloat(quantity),
      calories: (baseIngredient.calories * parseFloat(quantity)) / 100,
      protein: (baseIngredient.protein * parseFloat(quantity)) / 100,
      carbs: (baseIngredient.carbs * parseFloat(quantity)) / 100,
      fat: (baseIngredient.fat * parseFloat(quantity)) / 100,
    };

    setIngredients([...ingredients, newIngredient]);
    setSelectedIngredient('');
    setQuantity('');
    
    toast({
      title: "Ingredient Added",
      description: `${newIngredient.name} (${newIngredient.quantity}g) added to recipe`,
    });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    toast({
      title: "Ingredient Removed",
      description: "Ingredient removed from recipe",
    });
  };

  const saveRecipe = () => {
    if (!recipeName || ingredients.length === 0) {
      toast({
        title: "Error",
        description: "Please enter recipe name and add ingredients",
        variant: "destructive"
      });
      return;
    }

    const recipe: Recipe = {
      id: Date.now().toString(),
      name: recipeName,
      ingredients,
      totalNutrition: calculateTotalNutrition(ingredients),
      createdAt: new Date()
    };

    // Save to localStorage for demo purposes
    const savedRecipes = JSON.parse(localStorage.getItem('nutritionRecipes') || '[]');
    savedRecipes.push(recipe);
    localStorage.setItem('nutritionRecipes', JSON.stringify(savedRecipes));

    toast({
      title: "Recipe Saved",
      description: `Recipe "${recipeName}" saved successfully!`,
    });

    // Reset form
    setRecipeName('');
    setIngredients([]);
  };

  const totalNutrition = calculateTotalNutrition(ingredients);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-6 h-6 text-smartfood-600" />
            <span>Nutrition Calculator</span>
          </CardTitle>
          <CardDescription>
            Calculate nutritional values for your recipes by adding ingredients
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Recipe Name Input */}
          <div className="space-y-2">
            <Label htmlFor="recipeName">Recipe Name</Label>
            <Input
              id="recipeName"
              placeholder="Enter recipe name..."
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
            />
          </div>

          {/* Add Ingredients */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ingredient">Ingredient</Label>
              <select
                id="ingredient"
                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background"
                value={selectedIngredient}
                onChange={(e) => setSelectedIngredient(e.target.value)}
              >
                <option value="">Select ingredient...</option>
                {ingredientDatabase.map((ingredient) => (
                  <option key={ingredient.name} value={ingredient.name}>
                    {ingredient.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (grams)</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="100"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addIngredient} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Ingredient
              </Button>
            </div>
          </div>

          {/* Ingredients List */}
          {ingredients.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recipe Ingredients</h3>
              <div className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-smartfood-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{ingredient.name}</span>
                      <Badge variant="secondary">{ingredient.quantity}g</Badge>
                      <span className="text-sm text-muted-foreground">
                        {ingredient.calories.toFixed(1)} cal
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeIngredient(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nutrition Summary */}
          {ingredients.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-smartfood-600">
                    {totalNutrition.calories.toFixed(0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Calories</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-smartfood-600">
                    {totalNutrition.protein.toFixed(1)}g
                  </div>
                  <div className="text-sm text-muted-foreground">Protein</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-smartfood-600">
                    {totalNutrition.carbs.toFixed(1)}g
                  </div>
                  <div className="text-sm text-muted-foreground">Carbs</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-smartfood-600">
                    {totalNutrition.fat.toFixed(1)}g
                  </div>
                  <div className="text-sm text-muted-foreground">Fat</div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Save Recipe */}
          {ingredients.length > 0 && (
            <Button onClick={saveRecipe} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Recipe
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionCalculator;
