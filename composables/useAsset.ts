export default function (path: string): string {
    const assets = import.meta.glob('~/assets/**/*', {
      eager: true,
      import: 'default',
    })
    return assets['/assets/' + path] as string
  }