import { useMediaQuery } from 'react-responsive'

const useIsLaptop = () => {
    const isLaptop = useMediaQuery({ maxWidth: 1380, maxHeight: 800 })

    return (
        isLaptop
    )
}
export default useIsLaptop;
