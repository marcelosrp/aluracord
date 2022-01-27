import { Box, Image, Button } from '@skynexui/components'

export default function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Image
          styleSheet={{
            width: '60px',
          }}
          src="/assets/logo-ico-icq.png"
          alt="logo icq"
        />
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  )
}
