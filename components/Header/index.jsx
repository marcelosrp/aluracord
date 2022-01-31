import PropTypes from 'prop-types'
import { Box, Image, Text, Button, Icon } from '@skynexui/components'
import appConfig from '../../config.json'

export default function Header({ userGithubData }) {
  return (
    <>
      <Box
        styleSheet={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label={<Icon name="FaSignOutAlt" size={20} />}
          title="Fazer logout"
          href="/"
        />
      </Box>
      <Box
        styleSheet={{
          width: '100%',
          marginBottom: '24px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <a href={userGithubData.html_url} target="_blank">
          <Image
            src={userGithubData.avatar_url}
            styleSheet={{
              borderRadius: '50%',
              width: '60px',
              border: `3px solid ${appConfig.theme.colors.primary[200]}`,
            }}
          />
        </a>

        <Box styleSheet={{ width: '100%' }}>
          <Text
            as="h1"
            styleSheet={{
              marginBottom: '4px',
              fontSize: '20px',
              color: appConfig.theme.colors.primary[200],
            }}
          >
            {userGithubData.name}
          </Text>
          <Text
            as="p"
            styleSheet={{
              fontSize: '14px',
              color: appConfig.theme.colors.primary[200],
            }}
          >
            {userGithubData.bio}
          </Text>
        </Box>
      </Box>
    </>
  )
}

Header.propTypes = {
  userGithubData: PropTypes.object.isRequired,
}
