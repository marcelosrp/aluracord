import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Button, TextField, Image, Text } from '@skynexui/components'
import appConfig from '../config.json'

export default function PaginaInicial() {
  const [username, setUsername] = useState('')
  const [userGithubData, setUserGithubData] = useState({})
  //const [userNotFound, setUserNotFound] = useState(false)
  const [githubError, setGithubError] = useState(false)

  const router = useRouter()

  function handleSubmit(e) {
    e.preventDefault()

    router.push(`/chat/${username}`)
  }

  useEffect(() => {
    async function getGithubUser() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        const data = await response.json()

        if (response.status === 404) {
          setGithubError(true)
          return
        }

        if (response.status === 403) {
          setGithubError(true)
          //toast.error('Um erro foi encontrado, tente novamente mais tarde')
          return
        }

        setUserGithubData(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (username.length >= 3) {
      getGithubUser()
    }
  }, [username])

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Head>
        <title>ICQlura</title>
      </Head>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[300],
          width: '100%',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '330px',
            borderRadius: '15px',
            padding: '32px',
            margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[100],
          }}
        >
          <Image
            styleSheet={{
              width: '130px',
              marginBottom: '16px',
            }}
            src="/assets/logo.png"
            alt="logo icq"
          />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              textAlign: 'center',
              marginBottom: '32px',
            }}
            onSubmit={handleSubmit}
          >
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '165px',
                padding: '16px',
                borderRadius: '10px',
                flex: 1,
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '8px',
                }}
                src={
                  username.length > 3 && !githubError
                    ? `https://github.com/${username}.png`
                    : 'https://cdn-icons-png.flaticon.com/512/25/25231.png'
                }
                alt={`avatar ${username}`}
              />
            </Box>

            <Box
              styleSheet={{
                display: 'flex',
                marginBottom: '16px',
                gap: '6px',
              }}
            >
              {/* {!githubError &&
                (
                  <Text as="p">
                    <strong>Followers: </strong>
                    {userGithubData.followers}
                  </Text>
                ) |
                  (
                    <Text as="p">
                      <strong>Following: </strong>
                      {userGithubData.following}
                    </Text>
                  )} */}
            </Box>

            <TextField
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[900],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[100],
                },
              }}
              placeholder="Entre com seu usuário do github"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <Button
              type="submit"
              label="Sign In"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals['000'],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
              disabled={username.length <= 2}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}
