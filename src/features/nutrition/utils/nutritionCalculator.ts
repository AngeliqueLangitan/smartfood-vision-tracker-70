
import { Ingredient, NutritionSummary } from '../types/nutrition';

export const calculateTotalNutrition = (ingredients: Ingredient[]): NutritionSummary => {
  return ingredients.reduce(
    (total, ingredient) => ({
      calories: total.calories + ingredient.calories,
      protein: total.protein + ingredient.protein,
      carbs: total.carbs + ingredient.carbs,
      fat: total.fat + ingredient.fat,
      fiber: (total.fiber || 0) + (ingredient.fiber || 0),
      sugar: (total.sugar || 0) + (ingredient.sugar || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
  );
};

export const calculateNutritionPerServing = (
  totalNutrition: NutritionSummary,
  servings: number
): NutritionSummary => {
  return {
    calories: totalNutrition.calories / servings,
    protein: totalNutrition.protein / servings,
    carbs: totalNutrition.carbs / servings,
    fat: totalNutrition.fat / servings,
    fiber: (totalNutrition.fiber || 0) / servings,
    sugar: (totalNutrition.sugar || 0) / servings,
  };
};

export const calculateCalorieDistribution = (nutrition: NutritionSummary) => {
  const proteinCalories = nutrition.protein * 4;
  const carbCalories = nutrition.carbs * 4;
  const fatCalories = nutrition.fat * 9;
  const totalCalories = nutrition.calories;

  return {
    protein: (proteinCalories / totalCalories) * 100,
    carbs: (carbCalories / totalCalories) * 100,
    fat: (fatCalories / totalCalories) * 100,
  };
};
