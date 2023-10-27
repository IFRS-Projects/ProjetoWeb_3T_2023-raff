import { Theme } from '@radix-ui/themes'
import { MyApp } from '../MyApp'
export const Radix = () => {
  return (
    <html>
      <body>
        <Theme>
          <MyApp />
        </Theme>
      </body>
    </html>
  )
}