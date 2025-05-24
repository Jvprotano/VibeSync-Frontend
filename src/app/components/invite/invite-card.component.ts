import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invite-card',
  standalone: false,
  templateUrl: './invite-card.component.html',
  styleUrl: './invite-card.component.scss'
})
export class InviteCardComponent implements OnInit, OnChanges {

  @Input() spaceName: string = '';
  @Input() inviteLink: string = '';
  @Input() qrCode64: string = '';

  @ViewChild('inviteCardElement', { static: false }) inviteCardRef!: ElementRef<HTMLDivElement>;

  qrCodeDataUrl: string | null = null;
  displayLink: string = '';
  isProcessing: boolean = false;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.updateDisplayLink();
    this.setQrCode();
  }

  ngOnInit(): void {

    this.updateDisplayLink();
    this.setQrCode();
  }

  private updateDisplayLink(): void {
    console.log(this.spaceName)
    console.log(this.inviteLink)
    console.log(this.qrCode64)
    if (this.inviteLink) {
      this.displayLink = this.inviteLink
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '');
    } else {
      this.displayLink = '';
    }
  }

  private setQrCode(): void {
    if (this.qrCode64) {
      this.qrCodeDataUrl = this.qrCode64
    } else {
      this.qrCodeDataUrl = null;
    }
  }

  private async getInviteCanvas(): Promise<HTMLCanvasElement | null> {
    if (!this.inviteCardRef?.nativeElement) {
      console.error('Elemento do card do convite não encontrado.');
      return null;
    }

    try {
      const canvas = await html2canvas(this.inviteCardRef.nativeElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null,
      });
      // if (actionsElement) this.renderer.setStyle(actionsElement, 'display', ''); // Mostra de novo
      return canvas;
    } catch (error) {
      console.error('Erro ao gerar canvas do convite:', error);
      // if (actionsElement) this.renderer.setStyle(actionsElement, 'display', ''); // Mostra de novo em caso de erro
      return null;
    }
  }

  async downloadInvite(): Promise<void> {
    if (this.isProcessing) return;
    this.isProcessing = true;

    const canvas = await this.getInviteCanvas();
    if (canvas) {
      const imageDate = new Date().toISOString().split('T')[0];
      const fileName = `VibeSync_Convite_${this.spaceName.replace(/\s+/g, '_')}_${imageDate}.png`;

      const link = document.createElement('a');
      link.download = fileName;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link); // Necessário para Firefox
      link.click();
      document.body.removeChild(link); // Limpa o link
    }
    this.isProcessing = false;
  }

  async printInvite(): Promise<void> {
    if (this.isProcessing) return;
    this.isProcessing = true;

    const canvas = await this.getInviteCanvas();
    if (canvas) {
      const imageDataUrl = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');

      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <title>Imprimir Convite - ${this.spaceName}</title>
              <style>
                @page { size: auto; margin: 10mm; }
                body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 90vh;}
                img { max-width: 95%; max-height: 90vh; object-fit: contain; }
              </style>
            </head>
            <body>
              <img src="${imageDataUrl}" onload="window.print(); setTimeout(() => {window.close();}, 100);" />
            </body>
          </html>
        `);
        // O setTimeout no onload é para dar tempo ao navegador de renderizar a imagem antes de fechar.
        // Em alguns navegadores, window.close() pode não funcionar se a janela não foi aberta por script,
        // mas como abrimos com window.open, geralmente funciona.
        printWindow.document.close(); // Essencial para finalizar o carregamento da página
      } else {
        alert('Por favor, habilite pop-ups para imprimir o convite.');
      }
    }
    this.isProcessing = false;
  }
}