import api from '@/lib/api';
import { SwipeButtonProps } from '@/types/cards';

export default function SwButtons({
  exit,
  removeCard,
  id,
}: SwipeButtonProps) {
  const handleSwipe = (action: 'left' | 'right') => {
    if (action === 'left') {
      exit(-200);
    } else if (action === 'right') {
      exit(200);
    }
    removeCard(id, action);
  };
  return (
    <div className="flex items-center space-x-8 absolute top-10">
      <button
        onClick={async () => {
          handleSwipe('left')
          await api.movies.update(id,{love_amount:1})
        }}
        className="px-3 py-2 bg-teal-800 text-textGrey font-semibold rounded-md"
      >
        Assito
      </button>
      <button
        onClick={async () =>
        {
          handleSwipe('right')
          await api.movies.update(id,{love_amount:-1})
        }
        }
        className="px-3 py-2 bg-teal-800 text-textGrey font-semibold rounded-md"
      >
        Não assisto
      </button>
    </div>
  );
}
