import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Box, TextField } from '@skynexui/components'
import Header from '../components/Header'
import MessageList from '../components/MessageList'
import appConfig from '../config.json'

// colocar loading antes de trazer as imagens
// colocar dialog para exibir infos pessoais no hover do avatar

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
)

export default function ChatPage() {
  const [mensagem, setMensagem] = useState('')
  const [listaMensagens, setListaMensagens] = useState([])

  useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => setListaMensagens(data))
  }, [])

  function handleNovaMensagem(event) {
    const mensagemObj = {
      de: 'marcelosrp',
      texto: mensagem,
    }

    if (event.key === 'Enter') {
      event.preventDefault()

      supabaseClient
        .from('mensagens')
        .insert([mensagemObj])
        .then(({ data }) =>
          setListaMensagens(prevState => [data[0], ...prevState]),
        )
      setMensagem('')
    }
  }

  function handleDelMensagem(id) {
    supabaseClient
      .from('mensagens')
      .delete()
      .match({ id: id })
      .then(({ data }) => {
        const filteredMensages = listaMensagens.filter(
          item => item.id !== data[0].id,
        )
        setListaMensagens(filteredMensages)
      })
  }

  return (
    <Box
      styleSheet={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000'],
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
          maxWidth: '95%',
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
  )
}
