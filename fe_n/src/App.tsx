import React, { useState, useRef } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Brain, 
  Play, 
  Settings, 
  Book, 
  Target,
  Activity,
  ArrowUpDown,
  Zap,
  Eye,
  BookOpen,
  TestTube,
  Shuffle,
  GitBranch,
  Layers,
  Move,
  X,
  type LucideIcon
} from 'lucide-react';

// Type definitions
interface Indicator {
  id: number;
  name: string;
  category: 'trend' | 'momentum' | 'volatility' | 'volume' | 'support';
  color: string;
  description: string;
}

interface AILearner {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

interface StrategyComponent extends Omit<AILearner, 'id'> {
  id: number | string;
}

type TabType = 'indicators' | 'autotrade' | 'aitrade';

const CodeVizApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('indicators');
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null);
  const [aiComponents, setAiComponents] = useState<StrategyComponent[]>([]);
  const [strategyBuilder, setStrategyBuilder] = useState<StrategyComponent[]>([]);

  // Mock data for indicators with categorical coloring
  const indicators: Indicator[] = [
    { id: 1, name: 'Moving Average', category: 'trend', color: 'bg-blue-500', description: 'Smooths price data over time' },
    { id: 2, name: 'RSI', category: 'momentum', color: 'bg-green-500', description: 'Relative Strength Index' },
    { id: 3, name: 'MACD', category: 'momentum', color: 'bg-green-500', description: 'Moving Average Convergence Divergence' },
    { id: 4, name: 'Bollinger Bands', category: 'volatility', color: 'bg-purple-500', description: 'Price volatility bands' },
    { id: 5, name: 'Stochastic', category: 'momentum', color: 'bg-green-500', description: 'Momentum oscillator' },
    { id: 6, name: 'Volume', category: 'volume', color: 'bg-orange-500', description: 'Trading volume analysis' },
    { id: 7, name: 'Fibonacci', category: 'support', color: 'bg-red-500', description: 'Retracement levels' },
    { id: 8, name: 'Support/Resistance', category: 'support', color: 'bg-red-500', description: 'Key price levels' },
    { id: 9, name: 'Ichimoku Cloud', category: 'trend', color: 'bg-blue-500', description: 'Comprehensive trend analysis' },
    { id: 10, name: 'Williams %R', category: 'momentum', color: 'bg-green-500', description: 'Momentum oscillator' }
  ];

  const aiLearners: AILearner[] = [
    { id: 'regression', name: 'Linear Regression', icon: TrendingUp, description: 'Predicts price trends' },
    { id: 'decision', name: 'Decision Tree', icon: GitBranch, description: 'Rule-based decisions' },
    { id: 'klearner', name: 'K-Learner', icon: Target, description: 'K-means clustering' },
    { id: 'qlearner', name: 'Q-Learner', icon: Brain, description: 'Reinforcement learning' },
    { id: 'dynaq', name: 'Dyna-Q', icon: Zap, description: 'Model-based RL' }
  ];

  const handleDragEnd = (result: any): void => {
    if (!result.destination) return;
    
    const items = Array.from(strategyBuilder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setStrategyBuilder(items);
  };

  const addToStrategy = (learner: AILearner): void => {
    setStrategyBuilder([...strategyBuilder, { ...learner, id: Date.now() }]);
  };

  const removeFromStrategy = (id: number | string): void => {
    setStrategyBuilder(strategyBuilder.filter(item => item.id !== id));
  };

  const IndicatorExplorer: React.FC = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {indicators.map((indicator) => (
          <div
            key={indicator.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedIndicator(indicator)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${indicator.color}`}></div>
                <div>
                  <h3 className="font-semibold text-gray-900">{indicator.name}</h3>
                  <p className="text-sm text-gray-600">{indicator.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <BookOpen className="w-4 h-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 mb-2">Category Legend</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Trend</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Momentum</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Volatility</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Volume</span>
          </div>
        </div>
      </div>
    </div>
  );

  const AutoTrade: React.FC = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-2">Historical Trading Scenarios</h2>
        <p className="opacity-90">Practice trading on real historical data</p>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">2008 Financial Crisis</h3>
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Hard</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Navigate the market crash and recovery</p>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Start Scenario
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">COVID-19 Market Volatility</h3>
            <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">Medium</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Trade through pandemic market swings</p>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Start Scenario
          </button>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Bull Market 2017</h3>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Easy</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Learn in a favorable market environment</p>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Start Scenario
          </button>
        </div>
      </div>
    </div>
  );

  const AITrade: React.FC = () => (
    <div className="space-y-6">
      {/* AI Learners Selection */}
      <div>
        <h2 className="text-lg font-bold mb-4">AI Trading Components</h2>
        <div className="grid grid-cols-1 gap-3">
          {aiLearners.map((learner) => {
            const IconComponent = learner.icon;
            return (
              <div
                key={learner.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{learner.name}</h3>
                    <p className="text-sm text-gray-600">{learner.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => addToStrategy(learner)}
                  className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Add
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategy Builder */}
      <div>
        <h2 className="text-lg font-bold mb-4">Strategy Builder</h2>
        <div className="bg-gray-50 rounded-xl p-4 min-h-[200px]">
          {strategyBuilder.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <Layers className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>Drag and drop components to build your strategy</p>
            </div>
          ) : (
            <div className="space-y-3">
              {strategyBuilder.map((component, index) => {
                const IconComponent = component.icon;
                return (
                  <div
                    key={component.id}
                    className="bg-white rounded-lg p-3 flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-1 bg-blue-100 rounded">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium">{component.name}</span>
                      <span className="text-sm text-gray-500">#{index + 1}</span>
                    </div>
                    <button 
                      onClick={() => removeFromStrategy(component.id)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {strategyBuilder.length > 0 && (
          <div className="flex space-x-3 mt-4">
            <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
              <TestTube className="w-4 h-4" />
              <span>Backtest</span>
            </button>
            <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Deploy</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <span>CodeViz</span>
          </h1>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-100">
        <div className="flex px-4">
          <button
            onClick={() => setActiveTab('indicators')}
            className={`flex-1 py-3 text-center font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'indicators' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600'
            }`}
          >
            <BarChart3 className="w-4 h-4 mx-auto mb-1" />
            Indicators
          </button>
          <button
            onClick={() => setActiveTab('autotrade')}
            className={`flex-1 py-3 text-center font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'autotrade' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600'
            }`}
          >
            <Activity className="w-4 h-4 mx-auto mb-1" />
            Auto Trade
          </button>
          <button
            onClick={() => setActiveTab('aitrade')}
            className={`flex-1 py-3 text-center font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'aitrade' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600'
            }`}
          >
            <Brain className="w-4 h-4 mx-auto mb-1" />
            AI Trade
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        {activeTab === 'indicators' && <IndicatorExplorer />}
        {activeTab === 'autotrade' && <AutoTrade />}
        {activeTab === 'aitrade' && <AITrade />}
      </div>
    </div>
  );
};

export default CodeVizApp;