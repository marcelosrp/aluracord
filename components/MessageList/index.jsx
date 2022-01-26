import { Box, Text, Image, Button } from '@skynexui/components'
import appConfig from '../../config.json'

export default function MessageList({ mensagens, handleDelMensagem }) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px',
      }}
    >
      {mensagens.map(mensagem => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
            key={mensagem.id}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
                position: 'relative',
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/vanessametonini.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
              <Button
                variant="tertiary"
                colorVariant="neutral"
                label="Deletar"
                styleSheet={{
                  position: 'absolute',
                  right: '10px',
                }}
                onClick={() => handleDelMensagem(mensagem.id)}
              />
            </Box>
            {mensagem.texto}
          </Text>
        )
      })}
    </Box>
  )
}
