
export interface Ingredient {
  name: string;
  quantity: number; // in grams
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  fiber?: number; // in grams
  sugar?: number; // in grams
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  totalNutrition: NutritionSummary;
  createdAt: Date;
  servings?: number;
}

export interface NutritionSummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
}
