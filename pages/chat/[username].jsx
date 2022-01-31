import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, TextField, Button } from '@skynexui/components'
import { ToastContainer, toast } from 'react-toastify'
import Header from '../../components/Header'
import MessageList from '../../components/MessageList'
import ButtonSendSticker from '../../components/ButtonSendSticker'

import appConfig from '../../config.json'

import {
  getAllMessages,
  addNewMessage,
  deleteMessage,
  listenerMessages,
} from '../../helpers/request'

export default function ChatPage() {
  const [mensagem, setMensagem] = useState('')
  const [listaMensagens, setListaMensagens] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [userGithubData, setUserGithubData] = useState({})
  const [githubError, setGithubError] = useState(false)
  const [githubUserNotFound, setGithubUserNotFound] = useState(false)

  const router = useRouter()
  const { username } = router.query

  useEffect(() => {
    async function getGithubUser() {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        const data = await response.json()

        if (response.status === 404) {
          setGithubUserNotFound(true)
          return
        }

        if (response.status === 403) {
          setGithubError(true)
          toast.error('Um erro foi encontrado, tente novamente mais tarde')
          return
        }

        setUserGithubData(data)
      } catch (error) {
        toast.error(error)
      }
    }
    getGithubUser()
  }, [username])

  useEffect(() => {
    setIsLoading(true)
    getAllMessages()
      .then(({ error, status, data }) => {
        if (status === 404) {
          toast.error(error.message)
          return
        }

        setListaMensagens(data)
      })
      .catch(error => toast.error(error))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    listenerMessages(novaMensagem =>
      setListaMensagens(prevState => [novaMensagem, ...prevState]),
    )
  }, [])

  function handleNovaMensagem(novaMensagem) {
    const mensagemObj = {
      de: username,
      texto: novaMensagem,
    }

    addNewMessage(mensagemObj).then(({ data }) => data)
    setMensagem('')
  }

  function handleDelMensagem(id) {
    deleteMessage(id).then(({ data }) => {
      const filteredMensages = listaMensagens.filter(
        item => item.id !== data[0].id,
      )
      setListaMensagens(filteredMensages)
    })
    toast.success('Mensagem deletada com sucesso')
  }

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Head>
        <title>ICQlura :: Chat</title>
      </Head>
      <Box
        styleSheet={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[300],
          color: appConfig.theme.colors.neutrals['000'],
          width: '100%',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            borderRadius: '5px',
            backgroundColor: appConfig.theme.colors.neutrals[700],
            height: '100%',
            maxWidth: {
              xs: '95%',
              xl: '65%',
            },
            maxHeight: '95vh',
            padding: '32px',
          }}
        >
          <Header userGithubData={userGithubData} />

          <Box
            styleSheet={{
              position: 'relative',
              display: 'flex',
              flex: 1,
              height: '80%',
              backgroundColor: appConfig.theme.colors.neutrals[600],
              flexDirection: 'column',
              borderRadius: '5px',
              padding: '16px',
            }}
          >
            <MessageList
              mensagens={listaMensagens}
              handleDelMensagem={handleDelMensagem}
              isLoading={isLoading}
            />

            <Box
              as="form"
              styleSheet={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <TextField
                placeholder="Insira sua mensagem aqui..."
                type="textarea"
                styleSheet={{
                  width: '100%',
                  border: '0',
                  resize: 'none',
                  borderRadius: '5px',
                  padding: '6px 8px',
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  marginRight: '12px',
                  color: appConfig.theme.colors.neutrals[200],
                }}
                value={mensagem}
                onChange={({ target }) => setMensagem(target.value)}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    event.preventDefault()

                    if (mensagem.length === 0) {
                      toast.error('Digite uma mensagem')
                      return
                    }

                    handleNovaMensagem(mensagem)
                  }
                }}
              />

              <ButtonSendSticker
                onStickerClick={sticker => {
                  handleNovaMensagem(`:sticker: ${sticker}`)
                }}
              />

              <Button
                label="Enviar"
                styleSheet={{
                  padding: '12px',
                  margin: '-8px 12px 0 12px',
                  backgroundColor: appConfig.theme.colors.neutrals[700],
                  hover: {
                    backgroundColor: appConfig.theme.colors.primary[700],
                  },
                }}
                onClick={() => handleNovaMensagem(mensagem)}
                disabled={mensagem.length === 0}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
