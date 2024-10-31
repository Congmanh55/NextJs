export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): any {
    return (
        <div>
            {children}
        </div>
    );
}