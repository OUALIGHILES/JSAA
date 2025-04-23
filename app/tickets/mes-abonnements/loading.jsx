import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      {/* Hero Section Skeleton */}
      <section className="relative h-[200px] w-full overflow-hidden bg-gray-200">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96" />
        </div>
      </section>

      {/* Main Content Skeleton */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Tabs Skeleton */}
          <div className="flex justify-center mb-8">
            <Skeleton className="h-10 w-64 rounded-lg" />
          </div>

          {/* Card Skeleton */}
          <div className="space-y-6">
            <div className="border-0 shadow-md rounded-lg overflow-hidden">
              <div className="bg-gray-200 p-4 rounded-t-lg">
                <Skeleton className="h-8 w-64" />
              </div>
              <div className="p-6 bg-white">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                  <Skeleton className="h-10 w-64" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>

                {/* Subscription Card Skeleton */}
                <div className="border border-gray-100 rounded-lg p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    <div className="space-y-4 w-full">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-48" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                          <div key={i}>
                            <Skeleton className="h-4 w-32 mb-2" />
                            <Skeleton className="h-6 w-48" />
                          </div>
                        ))}
                      </div>

                      <div>
                        <Skeleton className="h-4 w-40 mb-2" />
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-2 w-full" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between gap-4 lg:min-w-[200px]">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-8 w-32 mb-2" />
                        <Skeleton className="h-3 w-40" />
                      </div>

                      <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
