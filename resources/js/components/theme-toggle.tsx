import { Moon, Sun, Monitor, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';
import { useTranslations } from '@/hooks/use-translations';

export function ThemeToggle() {
    const { appearance = 'system', updateAppearance } = useAppearance();
    const { t } = useTranslations();

    const items = [
        { value: 'system', label: t('system'), icon: <Monitor className="h-4 w-4" /> },
        { value: 'light', label: t('light'), icon: <Sun className="h-4 w-4" /> },
        { value: 'dark', label: t('dark'), icon: <Moon className="h-4 w-4" /> },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9"
                    title={`${t('theme')}: ${t(appearance as 'system' | 'light' | 'dark')}`}
                    aria-label={`${t('theme')}: ${t(appearance as 'system' | 'light' | 'dark')}`}
                >
                    {/* Animated theme icons */}
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">{t('toggle_theme')}</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-40 p-1 border border-border bg-popover text-popover-foreground shadow-md dark:bg-gray-800 dark:text-gray-100"
            >
                {items.map((item) => (
                    <DropdownMenuItem
                        key={item.value}
                        onClick={() => updateAppearance(item.value)}
                        className={`flex items-center gap-2 cursor-pointer focus:bg-accent focus:text-accent-foreground ${
                            appearance === item.value ? 'font-medium text-primary' : ''
                        }`}
                    >
                        {item.icon}
                        {item.label}
                        {appearance === item.value && <Check className="ml-auto h-4 w-4" />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
