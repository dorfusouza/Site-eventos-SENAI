import './SuportePage.css'
import Cabecalho from '../../Components/Cabecalho/Cabecalho.jsx'
import Rodape from '../../Components/Rodape/Rodape.jsx'
import imgBanner from '../../assets/Images/logo_zap.png'
import imgSuport from '../../assets/Images/suporte_img.png'
//import ReactModal from 'react-modal'
import React, { useState } from 'react'
import Modal from 'react-modal'
import ModalConteudo from '../../Components/ModalConteudo/ModalConteudo.jsx'

const SuportePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const frase = [
        `Somos uma equipe de alunos de Desenvolvimento de Sistemas apaixonados por criar soluções inovadoras. 
         Desenvolvemos um site de eventos para tornar a experiência de organizadores e participantes ainda mais fácil e divertida. 
         Estamos aqui para ajudar e garantir que sua experiência seja a melhor possível.`,

        `Em nosso site, aceitamos apenas pagamentos via Pix ou dinheiro. 
         Essas são as opções disponíveis para garantir uma experiência de pagamento simples e segura. 
         Se precisar de assistência ou tiver alguma dúvida sobre isso, estamos aqui para ajudar.`,

        `Reservar seu ingresso garante sua participação no evento e evita contratempos de última hora, como ingressos esgotados. 
         Além disso, ao fazer a reserva antecipadamente, você pode aproveitar eventuais benefícios extras, como descontos especiais. 
         Não deixe para depois, garanta agora mesmo o seu lugar e prepare-se para uma experiência incrível no evento!`,

        `Após reservar seu ingresso, por favor, procure um aluno da administração presente na Escola Senai Lençóis Paulista para validar sua reserva.
         Eles estarão prontos para ajudá-lo e garantir que sua participação seja registrada corretamente.
         Estamos ansiosos para recebê-lo e tornar sua experiência no evento ainda mais especial!`,
    ]
    const [itemFrase, setItemFrase] = useState('')

    const customModalStyle = {
        content: {
            width: '50%',
            height: '60%',
            margin: 'auto',

        },
    }

    const openModal = (item) => {
        setItemFrase(frase[item]);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    return (
        <div>
            <Cabecalho />
            <div className='tela'>
                <div className='esquerda_suporte'>
                    <div className='fundo_suporte'>
                        <div className='text_faq'>
                            <h2>DUVIDAS FREQUENTES</h2>
                        </div>
                    </div>
                    <div className='faq_frequentes'>
                        <button onClick={
                            () => {
                                openModal(0)
                            }
                        }>
                            <h1>Quem somos nós?</h1>
                        </button>
                    </div>
                    <div className='faq_frequentes'>
                        <button onClick={() => {
                            openModal(1)
                        }}>
                            <h1>Quais as formas de pagamento aceitas?</h1>
                        </button>
                    </div>
                    <div className='faq_frequentes'>
                        <button onClick={() => {
                            openModal(2)
                        }}  >
                            <h1>Por que reservar seu ingresso?</h1>
                        </button>
                    </div>
                    <div className='faq_frequentes'>
                        <button onClick={() => {
                            openModal(3)
                        }}>
                            <h1>Com quem falar após a reserva do ingresso?</h1>
                        </button>
                    </div>
                </div>
                <div className='direita_suporte'>
                    <img className='ImageSuport' src={imgSuport} />
                    <div className='whats_faq'>
                        <div className='text_whats'>
                            <a href="https://api.whatsapp.com/send?phone=+5514996551609">FALE CONOSCO</a>
                        </div>

                        <img className='img_zap' src={imgBanner} />
                    </div>
                </div>
            </div>
            <Modal
                keyboard={false}
                backdrop="static"
                ariaHideApp={false}
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={customModalStyle}
                contentLabel="Adicionar/Editar Acompanhamento"
            >
                <ModalConteudo texto={itemFrase} closeModal={closeModal} />
            </Modal>

            <Rodape />
        </div >
    )
}

export default SuportePage