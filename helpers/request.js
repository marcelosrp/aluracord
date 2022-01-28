import { createClient } from '@supabase/supabase-js'

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
)

export const getAllMessages = () => {
  return supabaseClient
    .from('mensagens')
    .select('*')
    .order('id', { ascending: false })
}

export const addNewMessage = mensagem => {
  return supabaseClient.from('mensagens').insert([mensagem])
}

export const deleteMessage = id => {
  return supabaseClient.from('mensagens').delete().match({ id: id })
}

export const listenerMessages = addMessage => {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', response => addMessage(response.new))
    .subscribe()
}
