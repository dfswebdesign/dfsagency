//Scroll Function on header to change color
const header = document.querySelector(".main-header");

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;
  if (scrollPos > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// seo form

//testing seotimizer

function soSubmit(el) {
  if (!soFormValidate(el.id)) {
    //e.preventDefault();
    return false;
  }
  var behaviour = el.getAttribute("data-behaviour");
  soBody = document.getElementsByTagName("body")[0];
  soBodyOriginalStyleHeight = soBody.style.height;
  soBodyOriginalStyleOverflow = soBody.style.overflow;
  var element = document.createElement("input");
  element.setAttribute("type", "hidden");
  element.setAttribute("name", "referrer");
  element.setAttribute("value", window.location.href);
  el.appendChild(element);
  if (behaviour == "new_tab") return true;
  if (behaviour == "modal") return soSubmitModal(el.id);
  if (behaviour == "be_in_touch") return soSubmitBeInTouch(el.id);
  if (behaviour == "redirect") return soSubmitRedirect(el.id);
}

function soFormValidate(id) {
  var domain = document.getElementById("so-domain" + id);
  var email = document.getElementById("so-email" + id);
  var phone = document.getElementById("so-phone" + id);
  var firstName = document.getElementById("so-first-name" + id);
  var lastName = document.getElementById("so-last-name" + id);
  var custom = document.getElementById("so-custom-field" + id);
  var consent = document.getElementById("so-consent-value" + id);
  if (0 == domain.value.length)
    return alert(domain.getAttribute("data-validation")), !1;
  if (
    ((domain.value = domain.value.trim().replace(/\/$/, "")),
    !domain.value.match(
      /^(https?:\/\/)?[a-z\d-]{1,62}\.[a-z\d-]{1,62}(\.[a-z\d-]{1,62})*$/i
    ))
  )
    return alert(domain.getAttribute("data-validation")), !1;
  if (null != email) {
    if (0 == email.value.length)
      return alert(email.getAttribute("data-validation")), !1;
    //var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!regex.test(email.value))
      return alert(email.getAttribute("data-validation")), !1;
  }
  if (null != phone && 0 == phone.value.length)
    return alert(phone.getAttribute("data-validation")), !1;
  if (null != firstName && 0 == firstName.value.length)
    return alert(firstName.getAttribute("data-validation")), !1;
  if (null != lastName && 0 == lastName.value.length)
    return alert(lastName.getAttribute("data-validation")), !1;
  if (null != custom && 0 == custom.value.length)
    return alert(custom.getAttribute("data-validation")), !1;
  if (null != consent && false === consent.checked)
    return alert(consent.getAttribute("data-validation")), !1;

  setTimeout(function () {
    var form = document.getElementById(id);
    form.reset();
    for (var i = 0; i < form.elements.length; i++) {
      form.elements[i].disabled = true;
      form.elements[i].style.opacity = 0.8;
    }
  }, 50);
  return true;
}

function soSubmitModal(id) {
  var modalWrapper = document.createElement("div");
  var button = document.getElementById("so-button" + id);
  var html =
    '<style type="text/css">\n' +
    "    @media (max-width:500px) { #so-widget-modal-content { width:100% !important; height:100% !important; margin-top:50px !important; } }\n" +
    "    @media (max-width:500px) and (max-height:550px) { #so-widget-modal-content { height:100% !important;} }\n" +
    "    @media (min-height:601px) and (max-height:750px) and (min-width:501px) { #so-widget-modal-content { margin-top:100px !important; } }\n" +
    "    @media (max-height:600px) and (min-width:501px) { #so-widget-modal-content { margin-top:80px !important; } }\n" +
    "    #iframe-wrapper {width: 100%;height: 100%;-webkit-overflow-scrolling: touch !important}\n" +
    "    #iframe-wrapper iframe {height: 100%;width: 100%;}\n" +
    "</style> \n" +
    '<div id="so-widget-modal-overlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); display:none; opacity:0; transition:opacity 0.3s ease;">\n' +
    '\t\t\t<div id="so-widget-modal-content" style="position:relative; width:80%; max-width: 1250px; height:80%; margin:120px auto 0; background:#fff;">\n' +
    '\t\t\t\t<div style="width:100%; height:50px; position:absolute; top:-50px; background:white;">\n' +
    '\t\t\t\t\t<span id="so-widget-modal-title" style="position:absolute; left:15px; top:15px; font-size:16px; font-weight:bold;"></span>\n';
  if (null != button && 0 !== button.value.length) {
    var styles = window.getComputedStyle(
      document.getElementById("so-submit" + id)
    );
    html +=
      '\t\t\t\t\t<a href="' +
      button.value +
      '" id="so-widget-modal-button" style="display: inline-block;position: absolute;top: 5px;right: 0;margin-right: 50px;text-decoration: none;background-color: ' +
      styles.backgroundColor +
      ";border: 1px solid " +
      styles.backgroundColor +
      ";color: " +
      styles.color +
      ';border-radius: 3px;font-size: 19px;padding: 8px 50px;">' +
      button.getAttribute("title") +
      "</a>\n";
  }
  html +=
    '\t\t\t\t\t<span onclick="closeSoModal();" style="display:inline-block; width:16px; height:16px; position:absolute; top:15px; right:15px; cursor:pointer; background-image:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAowAAAKMB8MeazgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAB5SURBVDiNrZPRCcAwCEQfnUiySAZuF8kSWeH6Yz8KrQZMQAicJ+epAB0YwAmYJKIADLic0/GPPCbQAnLznCd/4NWUFfkgy1VjH8CryA95ApYltAiTRCZxpuoW+gz9WXE6NPeg+ra1UDIxGlWEObe4SGxY5fIxlc75Bkt9V4JS7KWJAAAAAElFTkSuQmCC59ef34356faa7edebc7ed5432ddb673d\'); opacity:0.6;"></span>\n' +
    "\t\t\t\t</div>\n" +
    '                <div id="iframe-wrapper">\n' +
    '\t\t\t\t    <iframe name="so-iframe" id="so-iframe" scrolling="yes" style="border:1px solid transparent; width:100%; height:100%; box-sizing:border-box;"></iframe>\n' +
    "\t\t\t    </div>\n" +
    "\t\t\t</div>\n" +
    "\t\t</div>";
  modalWrapper.setAttribute(
    "style",
    "position:absolute; top:0; left:0; width:100%; z-index:9999999"
  );
  modalWrapper.setAttribute("id", "so-modal-wrapper");
  modalWrapper.innerHTML = html;
  document.body.appendChild(modalWrapper);

  var isMobile = false;
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  )
    isMobile = true;
  if (isMobile) {
    document.getElementById("so-type" + id).value = "web";
    if (null != button && 0 !== button.value.length)
      document.getElementById("so-widget-modal-title").style.display = "none";
  }

  var domain = document.getElementById("so-domain" + id).value;
  var soOverlay = document.getElementById("so-widget-modal-overlay");
  soOverlay.style.display = "block";
  document.getElementById("so-widget-modal-title").innerText =
    document.getElementById(id).getAttribute("data-title") + domain;
  soBody.style.height = "100%";
  soBody.style.overflow = "hidden";
  setTimeout(function () {
    soOverlay.style.opacity = 1;
  }, 50);
  return true;
}

function soSubmitBeInTouch(id) {
  var form = document.getElementById(id);
  var iframe = document.createElement("iframe");
  var element = document.createElement("input");
  element.setAttribute("type", "hidden");
  element.setAttribute("name", "be_in_touch");
  element.setAttribute("value", "1");
  form.appendChild(element);
  iframe.setAttribute("id", "so-iframe");
  iframe.setAttribute("name", "so-iframe");
  iframe.setAttribute(
    "style",
    "position:absolute; bottom:0; left:0; width:1px; height:1px; border:none"
  );
  document.body.appendChild(iframe);
  alert(form.getAttribute("data-touch"));
  return true;
}

function soSubmitRedirect(id) {
  var form = document.getElementById(id);
  form.removeAttribute("target");
  return true;
}

function closeSoModal() {
  var soOverlay = document.getElementById("so-widget-modal-overlay");
  soOverlay.style.opacity = 0;
  document.getElementById("so-modal-wrapper").remove();
  setTimeout(function () {
    soBody.style.height = soBodyOriginalStyleHeight;
    soBody.style.overflow = soBodyOriginalStyleOverflow;
    soOverlay.style.display = "none";
  }, 300);
}
