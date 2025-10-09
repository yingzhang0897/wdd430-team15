import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, className }: ButtonProps) {
    return (
        <button 
            className={clsx(
                'bg-blue-500 text-white py-2 px-4 rounded w-[155px]', 
                className,
            )}
        >
            {children}
        </button>
    );
}