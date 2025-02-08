export default function ErrorModal({ error, onClose }: { error: string; onClose: () => void }) {
  if (!error) return null;
  
  return (
    <div role="dialog" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md min-w-[300px]">
        <h3 className="text-lg font-semibold text-red-600 mb-4">Error</h3>
        <p className="text-gray-700 mb-4">{error}</p>
        <button
          onClick={onClose}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}