# 馮老師四合一學習平台與磅一磅！

此專案提供四合一入口，以及街市指針磅、物品圖片及教師驗證功能。入口連至各工具原有正式網址，保留其瀏覽器進度、後端 API、資料庫及教師設定。

統一入口：https://fung-math-hub.outshine-volleyball.workers.dev/

- 磅一磅：https://fung-math-hub.outshine-volleyball.workers.dev/scale
- 食物樂園：https://ten-math-food-playground.pages.dev/
- G8A：https://g8a-math-helper.pages.dev/
- G4：https://g4-math-helper.pages.dev/

入口 `public/portal.html` 使用固定連結，所有裝置無須另外設定網址。G8A 與 G4 維持原有獨立部署，入口不讀寫學生紀錄。

已發布網址：https://fung-math-hub.outshine-volleyball.workers.dev/scale

工作紙及 QR Code 使用較易辨認的入口：https://fung-math-hub.outshine-volleyball.workers.dev/fung-balance-weight 。這個路徑會顯示同一個模擬磅；Cloudflare 帳戶的 `outshine-volleyball.workers.dev` 部分維持不變，以免影響同帳戶其他網站。

錶面參考指針磅使用等距刻線：0 放在 12 點鐘，重量順時針增加，最高量程在 0 左邊，方便分辨兩個位置。紅色指針會根據秤盤物件的總重量轉動，並有輕微回彈。

量程有最多 100 g、800 g、1000 g、4 kg 四款。相鄰大刻度分為 2、5 或 10 小格：100 g 磅每段大刻度是 20 g，800 g 和 1000 g 磅是 200 g，4 kg 磅是 1 kg；小格重量由大刻度重量除以分格數得出。

桌面版將物件清單放左邊、放大的實物磅放中間、學生作答區放右邊；手機版按可用闊度排成單欄。物品卡可以直接點擊，每次放上一件；再點一次會增加同款物件。磅盤上的物件可點擊移走一件。物件清單使用食品、文具和日用品圖片；不再列出間尺、鉛筆和膠擦等不適合較大量程讀數的項目。物品圖採用透明背景單件剪影。

每件物品使用固定的教學模擬重量。物件清單會按量程及目前每格重量，顯示能對準刻線的物件。100 g 磅加入小包米餅、朱古力、膠水棒和小包紙巾等輕物件；4 kg 磅可使用米袋、西瓜、一包 A4 紙及洗衣液等較重實物。若放上多件後達到或超出量程，畫面會顯示提示。

學生可在磅旁輸入讀數，使用數字鍵盤核對答案，並逐步查看讀磅提示。改變磅的設定或盤上物件後，上一題答案會清空。「直接讀重量」仍須經後端核對教師密碼。

老師確認同一部 iPhone 在學校 Wi-Fi、關閉 VPN 時，可正常開啟新網址並看到磅及物品按鈕。

## 建置及發布

```sh
npm install
npm run build
npx wrangler deploy
```

首次發布後，在 Cloudflare Worker 設定 `TEACHER_KEY` secret，供「直接讀重量」核對教師密碼。請勿把密碼寫入原始碼或提交到 Git。

Cloudflare Worker 使用 `dist/` 內的靜態檔案，`/api/teacher/verify` 由 `worker/index.js` 回應。`/` 顯示四合一入口，`/scale` 與 `/fung-balance-weight` 顯示模擬磅頁面。

正式連結須用實際手機在學校 Wi-Fi 關閉 VPN 測試，確認可開啟後才交給學生。
