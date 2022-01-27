import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, TextField } from '@skynexui/components'
import { ToastContainer, toast } from 'react-toastify'
import Header from '../../components/Header'
import MessageList from '../../components/MessageList'

import appConfig from '../../config.json'

import {
  getAllMessages,
  addNewMessage,
  deleteMessage,
} from '../../helpers/request'

// colocar dialog para exibir infos pessoais no hover do avatar

export default function ChatPage() {
  const [mensagem, setMensagem] = useState('')
  const [listaMensagens, setListaMensagens] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { username } = router.query

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

  function handleNovaMensagem(event) {
    const mensagemObj = {
      de: username,
      texto: mensagem,
    }

    if (event.key === 'Enter') {
      event.preventDefault()

      addNewMessage(mensagemObj).then(({ data }) =>
        setListaMensagens(prevState => [data[0], ...prevState]),
      )
      setMensagem('')
    }
  }

  function handleDelMensagem(id) {
    deleteMessage(id).then(({ data }) => {
      const filteredMensages = listaMensagens.filter(
        item => item.id !== data[0].id,
      )
      setListaMensagens(filteredMensages)
    })
    toast.success('Mensagem deletada')
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
            maxWidth: '65%',
            maxHeight: '95vh',
            padding: '32px',
          }}
        >
          <Header />

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
                onKeyPress={event => handleNovaMensagem(event)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}