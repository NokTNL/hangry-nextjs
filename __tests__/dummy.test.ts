import { getStaticProps } from '@/pages/stores'

test('log getStaticProps results', async () => {
  const result = await getStaticProps()
  // @ts-ignore
  console.log(result.props)
})
