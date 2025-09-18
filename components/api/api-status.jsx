// "use client"

// import { useQuery } from "@tanstack/react-query"
// import { checkApiHealth } from "@/lib/api"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"

// export function ApiStatus() {
//   const { data, isLoading, error } = useQuery({
//     queryKey: ["api-health"],
//     queryFn: checkApiHealth,
//     refetchInterval: 30000, // Check every 30 seconds
//     retry: 3,
//   })

//   if (isLoading) {
//     return (
//       <Alert>
//         <Loader2 className="h-4 w-4 animate-spin" />
//         <AlertDescription>Checking API connection...</AlertDescription>
//       </Alert>
//     )
//   }

//   if (error) {
//     return (
//       <Alert variant="destructive">
//         <AlertCircle className="h-4 w-4" />
//         <AlertDescription>
//           API server is not responding. Please check your connection or contact support.
//         </AlertDescription>
//       </Alert>
//     )
//   }

//   if (data?.status === "ok") {
//     return (
//       <Alert className="border-green-200 bg-green-50">
//         <CheckCircle className="h-4 w-4 text-green-600" />
//         <AlertDescription className="text-green-800">API server is running normally</AlertDescription>
//       </Alert>
//     )
//   }

//   return null
// }
