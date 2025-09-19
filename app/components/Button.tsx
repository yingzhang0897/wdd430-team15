export default function Button({ children }: { children: React.ReactNode }) {
    return (
        <button className="bg-blue-500 text-white py-2 px-4 rounded w-[155px]">
            {children}
        </button>
    );
}