export default function DeleteDialog({
    idOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmButtonText,
    cancelButton,
}: {
    idOpen: string;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmButtonText: string;
    cancelButton: string;
}) {
  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black" aria-model="true">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-medium text-gray-900"> {title} </h3>
        <p className="mb-5 text-sm bg-red-50 hover:read-only:justify-around space-between"> {message} </p>
      </div>
      <div className="">
        <button className="" onClick={onClose}> {cancelButton} </button>
        <button className=""
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmButtonText}
        </button>
      </div>
    </div>
  );
}
