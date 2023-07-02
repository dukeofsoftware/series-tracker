"use client"
import { ThemeProvider } from "next-themes"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import {
    QueryClient,
    QueryClientProvider,

} from '@tanstack/react-query'
const queryClient = new QueryClient()

interface Props {
    children: React.ReactNode
}

const Providers: React.FC<Props> = ({
    children
}) => {
    return (
        <>
            <QueryClientProvider client={queryClient}>

                <ThemeProvider attribute="class" enableSystem={false}>
                    {children}
                    <ToastContainer />
                    <ReactQueryDevtools initialIsOpen={false} />
                </ThemeProvider>
            </QueryClientProvider>

        </>
    )
}

export default Providers