# Guia para Rodar o Aplicativo com Expo Dev Client

Este projeto utiliza o **Expo Dev Client** para desenvolvimento com código nativo. Siga os passos abaixo para configurar e rodar o aplicativo:

## 1. Instale as Dependências

```bash
npm install
# ou
yarn install
```

## 2. Gere a Build Nativa

Você precisa gerar uma build customizada do aplicativo (Android ou iOS) para incluir o código nativo necessário. Isso pode ser feito localmente ou utilizando o **EAS Build**.
```bash
# para anroid
npm run android

# para ios
npm run ios
```

### Usando EAS Build

1. Instale o EAS CLI:
  ```bash
  npm install -g eas-cli
  ```
2. Faça login na sua conta Expo:
  ```bash
  eas login
  ```
3. Inicie a build:
  - **Android:**
    ```bash
    eas build -p android --profile development
    ```
  - **iOS:**
    ```bash
    eas build -p ios --profile development
    ```

### Build Local

Para builds locais, siga a [documentação oficial do Expo](https://docs.expo.dev/clients/installation/#building-your-development-client).

## 3. Instale o APK/IPA no Dispositivo

Após a build ser concluída, baixe o arquivo gerado (`.apk` para Android ou `.ipa` para iOS) e instale no seu dispositivo.

## 4. Rode o Expo Dev Client

Inicie o servidor de desenvolvimento:

```bash
npx expo start --dev-client
```

Abra o app no dispositivo e escaneie o QR Code exibido no terminal ou navegador.

---

**Observação:** Sempre que adicionar ou alterar dependências nativas, será necessário gerar uma nova build do Dev Client.

```bash
npx expo prebuild
```