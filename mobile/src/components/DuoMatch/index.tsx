import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from "expo-clipboard";
import { CheckCircle } from 'phosphor-react-native';
import { ActivityIndicator, Alert, Modal, ModalProps, Text, TouchableOpacity, View } from 'react-native';

import { THEME } from '../../theme';
import { styles } from './styles';


import { useState } from 'react';
import { Heading } from '../Heading';

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    const [isCopying, setIsCopying] = useState(false)
    
    async function handleCopyDiscordUserToClipboard(){
        await Clipboard.setStringAsync(discord);
        setIsCopying(true)
        Alert.alert("Discord Copiado.","Usuário copiado para a área de transferência!")
        setIsCopying(false)
    }

    return (
        <Modal
            animationType='fade'
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <MaterialIcons
                            name="close"
                            size={20}
                            color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>
                    <CheckCircle
                        size={64}
                        color={THEME.COLORS.SUCCESS}
                        weight='bold'
                    />

                    <Heading
                        title="Let's Play"
                        subtitle="Agora é só começar a jogar"
                        style={{ alignItems: 'center', marginTop: 24 }}
                    />

                    <Text style={styles.label}>
                        Adicione seu discord!
                    </Text>
                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handleCopyDiscordUserToClipboard}
                        disabled={isCopying}
                    >
                        <Text style={styles.discord}>
                            { isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

    );
}