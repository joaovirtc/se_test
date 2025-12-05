export default function CarouselSkeleton() {
      return (
            <>
                  <div className="skeleton_animation aspect-video w-full mx-auto"></div>
                  <div className="w-full flex justify-between">
                        <div className="skeleton_animation w-2/4 mt-3 h-3"></div>
                        {/* <div className="flex gap-x-2">
                              <div className="skeleton_animation w-10 h-10 !rounded-full"></div>
                              <div className="skeleton_animation w-10 h-10 !rounded-full"></div>
                        </div> */}
                  </div>
            </>
      )

}