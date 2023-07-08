import * as React from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type Status = {
    value: string
    label: string
}

const statuses: Status[] = [
    {
        value: "Watched",
        label: "Watched",
    },
    {
        value: "NotWatched",
        label: "Not Watched",
    },
    {
        value: "Skipped",
        label: "Skipped",
    },

]
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
export default function ChangeSeriesStatus() {
    const [open, setOpen] = React.useState(false)
    const [selectedStatus, setSelectedStatus] = React.useState<Status | null>({
        value: "NotWatched",
        label: "Not Watched",
    })

    return (
        <>
             <DropdownMenu>
                <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline" }),"sm:hidden")}>{
                    selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>
                }</DropdownMenuTrigger>
                <DropdownMenuContent>

                    {
                        statuses.map((status) => (
                            <DropdownMenuItem
                                key={status.value}

                            >
                                <Button
                                    onClick={() => {
                                        setSelectedStatus(status)
                                        setOpen(false)
                                    }}
                                    variant="ghost"
                                    className="w-full justify-start rounded-md"
                                >
                                    {status.label}
                                </Button>
                            </DropdownMenuItem>

                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden sm:flex items-center space-x-4">
                <p className="text-sm text-muted-foreground">Status</p>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[150px] justify-start">
                            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" side="right" align="start">
                        <Command>
                            <CommandInput placeholder="Change status..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {statuses.map((status) => (
                                        <CommandItem
                                            key={status.value}
                                            onSelect={() => {
                                                setSelectedStatus(status)
                                                setOpen(false)
                                            }}
                                        >
                                            {status.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </>

    )
}