export enum NetworkConnectionLevel {
  NoConnection = 'NoConnection', // 未连接任何网络（包括物理断开，或仅虚拟网卡活跃）
  LocalNetworkOnly = 'LocalNetworkOnly', // 已连接到局域网，但无法访问互联网
  InternetRestricted = 'InternetRestricted', // 已连接到互联网，但无法访问被 GFW 阻断的服务（例如，无法访问 Gemini API）
  InternetFullAccess = 'InternetFullAccess' // 已连接到互联网，且能够访问所有服务（例如，可以访问 Gemini API）
}
