import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, className }: ButtonProps) {
    return (
        <button 
            className={clsx(
                'bg-accent text-neutral-light py-2 px-5 rounded-lg shadow-sm transition-colors hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed', 
                className,
            )}
        >
            {children}
        </button>
    );
}
