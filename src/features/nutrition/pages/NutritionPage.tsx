
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calculator, BookOpen } from "lucide-react";
import NutritionCalculator from '../components/NutritionCalculator';
import RecipeManager from '../components/RecipeManager';

const NutritionPage = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'recipes'>('calculator');

  return (
    <div className="min-h-screen bg-smartfood-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-smartfood-800 mb-4">
            Nutrition Center
          </h1>
          <p className="text-lg text-smartfood-600 max-w-2xl mx-auto">
            Calculate nutritional values for your recipes and manage your healthy meal plans
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <Button
              variant={activeTab === 'calculator' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('calculator')}
              className="flex items-center space-x-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculator</span>
            </Button>
            <Button
              variant={activeTab === 'recipes' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('recipes')}
              className="flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>My Recipes</span>
            </Button>
          </div>
        </div>

        <div className="animate-fade-in">
          {activeTab === 'calculator' && <NutritionCalculator />}
          {activeTab === 'recipes' && <RecipeManager />}
        </div>
      </div>
    </div>
  );
};

export default NutritionPage;
