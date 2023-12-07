import api from '@/lib/api'
import { SwipeButtonProps } from '@/types/cards'
import { Button } from '../ui/button'

export default function SwButtons({ exit, removeCard, id }: SwipeButtonProps) {
  const handleSwipe = (action: 'left' | 'right') => {
    if (action === 'left') {
      exit(-200)
    } else if (action === 'right') {
      exit(200)
    }
    removeCard(id, action)
  }
  return (
    <div className="flex items-center space-x-8 absolute top-10">
      <Button
        onClick={async () => {
          handleSwipe('left')
          await api.movies.update(id, { love_amount: 1 })
        }}
        className="px-3 py-2 text-textGrey font-semibold rounded-full w-24"
      >
        Assito
      </Button>
      <Button
        onClick={async () => {
          handleSwipe('right')
          await api.movies.update(id, { love_amount: -1 })
        }}
        className="px-3 py-2 text-textGrey font-semibold rounded-full"
      >
        Não assisto
      </Button>
    </div>
  )
}
