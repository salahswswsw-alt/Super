import React, { useState } from 'react';
import { Home, ShoppingCart, Users, Plus, Wallet, ArrowUpRight, ArrowDownRight, X } from 'lucide-react';

type Tab = 'home' | 'purchases' | 'debts';

interface Purchase {
  id: string;
  name: string;
  price: number;
  date: string;
}

interface Debt {
  id: string;
  person: string;
  amount: number;
  type: 'owe' | 'owed'; // owe = I owe them, owed = They owe me
  reason: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addType, setAddType] = useState<'purchase' | 'debt'>('purchase');

  // Mock Data
  const [purchases, setPurchases] = useState<Purchase[]>([
    { id: '1', name: 'حليب وخبز', price: 15, date: '2023-10-25' },
    { id: '2', name: 'خضروات مشكلة', price: 45, date: '2023-10-24' },
  ]);

  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', person: 'أحمد', amount: 150, type: 'owed', reason: 'عشاء الأمس' },
    { id: '2', person: 'سارة', amount: 50, type: 'owe', reason: 'قهوة' },
  ]);

  const totalPurchases = purchases.reduce((sum, p) => sum + p.price, 0);
  const totalOwedToMe = debts.filter(d => d.type === 'owed').reduce((sum, d) => sum + d.amount, 0);
  const totalIOwe = debts.filter(d => d.type === 'owe').reduce((sum, d) => sum + d.amount, 0);

  const handleAddClick = (type: 'purchase' | 'debt') => {
    setAddType(type);
    setIsAddModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      {/* Mobile App Container */}
      <div className="w-full max-w-md bg-gray-50 h-screen flex flex-col relative shadow-2xl overflow-hidden">
        
        {/* Header */}
        <header className="bg-teal-600 text-white p-4 shadow-md z-10">
          <h1 className="text-xl font-bold text-center">
            {activeTab === 'home' && 'الرئيسية'}
            {activeTab === 'purchases' && 'المشتريات'}
            {activeTab === 'debts' && 'الديون'}
          </h1>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 pb-24">
          {activeTab === 'home' && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                  <ShoppingCart className="text-teal-500 mb-2" size={28} />
                  <span className="text-sm text-gray-500">مصاريف السوبرماركت</span>
                  <span className="text-xl font-bold text-gray-800">{totalPurchases} ريال</span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                  <Wallet className="text-teal-500 mb-2" size={28} />
                  <span className="text-sm text-gray-500">صافي الديون</span>
                  <span className={`text-xl font-bold ${totalOwedToMe - totalIOwe >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(totalOwedToMe - totalIOwe)} ريال
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">إجراءات سريعة</h2>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleAddClick('purchase')}
                    className="flex-1 bg-teal-50 text-teal-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-teal-100 transition"
                  >
                    <Plus size={20} /> إضافة مشتريات
                  </button>
                  <button 
                    onClick={() => handleAddClick('debt')}
                    className="flex-1 bg-blue-50 text-blue-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-100 transition"
                  >
                    <Plus size={20} /> إضافة دين
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3">آخر النشاطات</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {purchases.slice(0, 2).map(p => (
                    <div key={p.id} className="p-4 border-b border-gray-50 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-teal-100 p-2 rounded-full text-teal-600">
                          <ShoppingCart size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{p.name}</p>
                          <p className="text-xs text-gray-400">{p.date}</p>
                        </div>
                      </div>
                      <span className="font-bold text-gray-800">{p.price} ريال</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'purchases' && (
            <div className="space-y-4">
              {purchases.map(p => (
                <div key={p.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{p.name}</p>
                    <p className="text-sm text-gray-400">{p.date}</p>
                  </div>
                  <div className="bg-teal-50 px-4 py-2 rounded-lg">
                    <span className="font-bold text-teal-700">{p.price} ريال</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'debts' && (
            <div className="space-y-4">
              {/* Debt Summary */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-green-50 p-3 rounded-xl border border-green-100">
                  <p className="text-xs text-green-600 mb-1">لي (أطلبهم)</p>
                  <p className="font-bold text-green-700 text-lg">{totalOwedToMe} ريال</p>
                </div>
                <div className="flex-1 bg-red-50 p-3 rounded-xl border border-red-100">
                  <p className="text-xs text-red-600 mb-1">علي (يطلبوني)</p>
                  <p className="font-bold text-red-700 text-lg">{totalIOwe} ريال</p>
                </div>
              </div>

              {debts.map(d => (
                <div key={d.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${d.type === 'owed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {d.type === 'owed' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{d.person}</p>
                      <p className="text-xs text-gray-500">{d.reason}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${d.type === 'owed' ? 'text-green-600' : 'text-red-600'}`}>
                    {d.type === 'owed' ? '+' : '-'}{d.amount} ريال
                  </span>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Floating Action Button (Only on specific tabs) */}
        {activeTab !== 'home' && (
          <button 
            onClick={() => handleAddClick(activeTab === 'purchases' ? 'purchase' : 'debt')}
            className="absolute bottom-24 left-6 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition-transform active:scale-95 z-20"
          >
            <Plus size={24} />
          </button>
        )}

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 flex justify-around p-2 pb-safe z-20">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center p-2 w-20 transition-colors ${activeTab === 'home' ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Home size={24} className="mb-1" />
            <span className="text-[10px] font-bold">الرئيسية</span>
          </button>
          <button 
            onClick={() => setActiveTab('purchases')}
            className={`flex flex-col items-center p-2 w-20 transition-colors ${activeTab === 'purchases' ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <ShoppingCart size={24} className="mb-1" />
            <span className="text-[10px] font-bold">المشتريات</span>
          </button>
          <button 
            onClick={() => setActiveTab('debts')}
            className={`flex flex-col items-center p-2 w-20 transition-colors ${activeTab === 'debts' ? 'text-teal-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Users size={24} className="mb-1" />
            <span className="text-[10px] font-bold">الديون</span>
          </button>
        </nav>

        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="absolute inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-white w-full rounded-3xl sm:rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-10">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {addType === 'purchase' ? 'إضافة مشتريات' : 'إضافة دين'}
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full">
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                {addType === 'purchase' ? (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">اسم المنتج</label>
                      <input type="text" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="مثال: خبز، حليب..." />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">السعر (ريال)</label>
                      <input type="number" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="0.00" />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">اسم الشخص</label>
                      <input type="text" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="مثال: أحمد، سارة..." />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">المبلغ (ريال)</label>
                      <input type="number" className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none" placeholder="0.00" />
                    </div>
                    <div className="flex gap-4 pt-2">
                      <label className="flex-1 flex items-center gap-2 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="debtType" className="text-teal-600 focus:ring-teal-500" defaultChecked />
                        <span className="text-sm font-semibold">أنا أطلبه (لي)</span>
                      </label>
                      <label className="flex-1 flex items-center gap-2 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                        <input type="radio" name="debtType" className="text-teal-600 focus:ring-teal-500" />
                        <span className="text-sm font-semibold">هو يطلبني (علي)</span>
                      </label>
                    </div>
                  </>
                )}
                
                <button 
                  className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl mt-4 hover:bg-teal-700 transition active:scale-[0.98]"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  حفظ وإضافة
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
