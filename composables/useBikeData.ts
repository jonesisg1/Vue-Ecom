import bikeData from './bike-shop-data.json'
import type { Bike } from '~/components/types'

export const useBikeData = () : Bike[] => {
    // @ts-ignore: The type is correct!
    return bikeData
}