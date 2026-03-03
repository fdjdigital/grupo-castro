/* Gerador de Assinatura - Grupo Castro */

var campos = ['nome', 'setor', 'whatsapp', 'telefone', 'email'];
var baseURL = 'https://bygrupocastro.com.br/img/email/';

function gerarAssinatura() {
  var nome = document.getElementById('nome').value || 'Nome Completo';
  var setor = document.getElementById('setor').value || 'Setor';
  var whatsapp = document.getElementById('whatsapp').value || '(00) 00000-0000';
  var telefone = document.getElementById('telefone').value || '(00) 0000-0000';
  var email = document.getElementById('email').value || 'email@bygrupocastro.com.br';

  var html = '<table cellpadding="0" cellspacing="0" border="0" style="font-family:Calibri,Arial,Helvetica,sans-serif;width:100%;max-width:480px;border-radius:6px;overflow:hidden;border-collapse:collapse;">'
    + '<tr><td style="background:#112e3f;padding:0;vertical-align:top;">'
    + '<table cellpadding="0" cellspacing="0" border="0" width="100%"><tr>'
    + '<td style="padding:26px 24px 24px 26px;vertical-align:top;">'
    + '<p style="margin:0 0 3px 0;font-size:20px;font-weight:700;color:#ffffff;font-family:Calibri,Arial,Helvetica,sans-serif;letter-spacing:0.3px;">'
    + escapeHTML(nome) + '</p>'
    + '<p style="margin:0 0 18px 0;font-size:12px;color:#5ba3d9;font-family:Calibri,Arial,Helvetica,sans-serif;letter-spacing:2px;text-transform:uppercase;">'
    + escapeHTML(setor) + '</p>'
    + '<table cellpadding="0" cellspacing="0" border="0">'
    // WhatsApp
    + '<tr>'
    + '<td style="vertical-align:middle;padding:0 7px 8px 0;width:18px;">'
    + '<img src="' + baseURL + 'icon-whatsapp.svg" alt="" width="16" height="16" style="display:block;border:0;" />'
    + '</td>'
    + '<td style="vertical-align:middle;padding:0 0 8px 0;">'
    + '<span style="font-size:13px;color:#8baabb;font-family:Calibri,Arial,Helvetica,sans-serif;">' + escapeHTML(whatsapp) + '</span>'
    + '</td></tr>'
    // Telefone
    + '<tr>'
    + '<td style="vertical-align:middle;padding:0 7px 8px 0;width:18px;">'
    + '<img src="' + baseURL + 'icon-phone.svg" alt="" width="16" height="16" style="display:block;border:0;" />'
    + '</td>'
    + '<td style="vertical-align:middle;padding:0 0 8px 0;">'
    + '<span style="font-size:13px;color:#8baabb;font-family:Calibri,Arial,Helvetica,sans-serif;">' + escapeHTML(telefone) + '</span>'
    + '</td></tr>'
    // Email
    + '<tr>'
    + '<td style="vertical-align:middle;padding:0 7px 0 0;width:18px;">'
    + '<img src="' + baseURL + 'icon-email.svg" alt="" width="16" height="13" style="display:block;border:0;" />'
    + '</td>'
    + '<td style="vertical-align:middle;padding:0;">'
    + '<a href="mailto:' + escapeHTML(email) + '" style="font-size:13px;color:#8baabb;font-family:Calibri,Arial,Helvetica,sans-serif;text-decoration:none;">' + escapeHTML(email) + '</a>'
    + '</td></tr>'
    + '</table>'
    + '</td>'
    // Coluna decorativa
    + '<td style="vertical-align:top;padding:0;width:140px;" width="140">'
    + '<table cellpadding="0" cellspacing="0" border="0" width="100%">'
    + '<tr><td align="right" style="padding:0;vertical-align:top;">'
    + '<img src="' + baseURL + 'deco-people.svg" alt="" width="140" height="80" style="display:block;border:0;" />'
    + '</td></tr>'
    + '<tr><td align="right" style="padding:0 18px 18px 0;vertical-align:bottom;">'
    + '<img src="' + baseURL + 'symbol-3c.svg" alt="Castro" width="46" height="50" style="display:block;border:0;margin-left:auto;" />'
    + '</td></tr>'
    + '</table>'
    + '</td>'
    + '</tr></table>'
    + '</td></tr></table>'
    // Aviso de confidencialidade
    + '<table cellpadding="0" cellspacing="0" border="0" style="font-family:Calibri,Arial,Helvetica,sans-serif;width:100%;max-width:480px;margin:0;padding:0;">'
    + '<tr><td style="padding:10px 4px 0 4px;">'
    + '<p style="margin:0;font-size:11px;color:#888888;font-style:italic;font-family:Calibri,Arial,Helvetica,sans-serif;line-height:1.5;">'
    + '&ldquo;Esta mensagem, juntamente com qualquer outra informa&ccedil;&atilde;o anexada, &eacute; confidencial e protegida por lei, e somente os seus destinat&aacute;rios s&atilde;o autorizados a us&aacute;-la. Caso a tenha recebido por engano, por favor, informe o remetente e em seguida apague a mensagem, observando que n&atilde;o h&aacute; autoriza&ccedil;&atilde;o para armazenar, encaminhar, imprimir, usar, copiar o seu conte&uacute;do.&rdquo;'
    + '</p></td></tr></table>';

  document.getElementById('preview-box').innerHTML = html;
}

function escapeHTML(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function copiarAssinatura() {
  var preview = document.getElementById('preview-box');
  var range = document.createRange();
  range.selectNodeContents(preview);

  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);

  var html = preview.innerHTML;
  var blob = new Blob([html], { type: 'text/html' });
  var plainBlob = new Blob([preview.innerText], { type: 'text/plain' });

  if (navigator.clipboard && navigator.clipboard.write) {
    var item = new ClipboardItem({
      'text/html': blob,
      'text/plain': plainBlob
    });
    navigator.clipboard.write([item]).then(function() {
      mostrarFeedback();
    }).catch(function() {
      copiarFallback();
    });
  } else {
    copiarFallback();
  }

  sel.removeAllRanges();
}

function copiarFallback() {
  try {
    document.execCommand('copy');
    mostrarFeedback();
  } catch (e) {
    alert('Nao foi possivel copiar. Selecione a assinatura manualmente e copie com Ctrl+C.');
  }
}

function mostrarFeedback() {
  var el = document.getElementById('copy-feedback');
  el.classList.add('show');
  setTimeout(function() {
    el.classList.remove('show');
  }, 2500);
}

// Trocar tutorial Webmail/Outlook
function trocarTutorial(tipo) {
  var panels = document.querySelectorAll('.tutorial-panel');
  var btns = document.querySelectorAll('.tab-btn');
  for (var i = 0; i < panels.length; i++) {
    panels[i].classList.remove('active');
  }
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
  }
  document.getElementById('tutorial-' + tipo).classList.add('active');
  var idx = tipo === 'webmail' ? 0 : 1;
  btns[idx].classList.add('active');
}

// Atualizar preview em tempo real
campos.forEach(function(id) {
  document.getElementById(id).addEventListener('input', gerarAssinatura);
});

// Gerar preview inicial
gerarAssinatura();
