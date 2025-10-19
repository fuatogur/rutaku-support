import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';

export function ThemeToggle() {
    const { appearance = 'system', updateAppearance } = useAppearance();

    const items = [
        { value: 'system', label: 'System', icon: <Monitor className="h-4 w-4 mr-2" /> },
        { value: 'light', label: 'Light', icon: <Sun className="h-4 w-4 mr-2" /> },
        { value: 'dark', label: 'Dark', icon: <Moon className="h-4 w-4 mr-2" /> },
    ];

    const currentIcon =
        appearance === 'light' ? <Sun className="h-4 w-4" /> :
            appearance === 'dark' ? <Moon className="h-4 w-4" /> :
                <Monitor className="h-4 w-4" />;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                    title={`Theme: ${appearance}`}
                >
                    {currentIcon}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {items.map((item) => (
                    <DropdownMenuItem
                        key={item.value}
                        onClick={() => updateAppearance(item.value)}
                        className={`flex items-center ${
                            appearance === item.value ? 'font-medium text-primary' : ''
                        }`}
                    >
                        {item.icon}
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
