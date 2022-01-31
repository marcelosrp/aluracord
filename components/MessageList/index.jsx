import PropTypes from 'prop-types'
import { Box, Text, Image, Button, Icon } from '@skynexui/components'
import Spinner from '../Spinner'
import appConfig from '../../config.json'

export default function MessageList({
  mensagens,
  handleDelMensagem,
  isLoading,
}) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals['000'],
        marginBottom: '16px',
      }}
      className="custom-scrollbar"
    >
      {isLoading ? (
        <Box
          styleSheet={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Spinner />
        </Box>
      ) : (
        <>
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
                    src={`https://github.com/${mensagem.de}.png`}
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
                    label={<Icon name="FaTrash" />}
                    styleSheet={{
                      position: 'absolute',
                      right: '10px',
                      backgroundColor: '#df3737',
                      color: 'white',
                    }}
                    title="Deletar mensagem"
                    onClick={() => handleDelMensagem(mensagem.id)}
                  />
                </Box>

                {mensagem.texto.startsWith(':sticker:') ? (
                  <Image
                    styleSheet={{
                      maxWidth: '150px',
                    }}
                    src={`${mensagem.texto.replace(':sticker:', '')}`}
                  />
                ) : (
                  mensagem.texto
                )}
              </Text>
            )
          })}
        </>
      )}
    </Box>
  )
}

MessageList.propTypes = {
  mensagens: PropTypes.array.isRequired,
  handleDelMensagem: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}
