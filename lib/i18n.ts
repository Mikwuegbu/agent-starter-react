import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        akademie: "Academy",
        login: "Login",
        logoutError: "Logout Failed",
        logoutSuccess: "Logged Out",
        logoutSuccessDesc: "You have been successfully logged out."
      },
      hero: {
        title: "Welcome to Exideus Academy",
        subtitle: "Your AI Academy",
        description: "Discover the power of artificial intelligence through our comprehensive academy. Learn, grow, and transform with cutting-edge AI education."
      },
      personas: {
        title: "AI Personas",
        subtitle: "Choose your learning path",
        medical: {
          title: "Medical AI",
          subtitle: "Compassionate Care & Evidence-Based Counseling",
          description: "Advanced healthcare AI solutions and medical diagnostics training.",
          features: {
            support: "🔮 Compassionate Support",
            advice: "⚕️ Evidence-Based Counseling", 
            insights: "🧬 Preventive Insights"
          }
        },
        sales: {
          title: "Sales AI",
          subtitle: "Consultative Selling & Relationship Building",
          description: "Boost your sales performance with AI-driven strategies and insights.",
          features: {
            value: "💰 Value Creation",
            psychology: "🧠 Customer Psychology",
            objections: "📈 Objection Handling"
          }
        },
        coaching: {
          title: "AI Coaching",
          subtitle: "Emotional Safety & Personal Growth",
          description: "Personal development and coaching enhanced by artificial intelligence.",
          features: {
            growth: "🌟 Inner Growth",
            resilience: "🎯 Emotional Resilience",
            reflection: "🔮 Guided Reflection"
          }
        },
        growth: {
          title: "Growth AI",
          subtitle: "Digital Business Scaling & Marketing Strategy",
          description: "Accelerate business growth with data-driven AI solutions.",
          features: {
            scaling: "🌟 Business Scaling",
            strategy: "🎯 Marketing Strategy",
            insights: "🔮 Action-Oriented Insights"
          }
        }
      },
      archive: {
        title: "Knowledge Archive",
        subtitle: "Explore our comprehensive library", 
        description: "Access thousands of resources, tutorials, and research papers in our ever-growing knowledge base.",
        explore: "Explore Archive",
        items: {
          future: {
            title: "Future of AI",
            description: "Discover visions and predictions about the development of human-AI collaboration."
          },
          algorithms: {
            title: "Core Algorithms",
            description: "Unveil the mathematical foundations that enable intelligence and perception."
          },
          transformation: {
            title: "Practical Transformation",
            description: "Learn how digital systems create real impact and change."
          }
        }
      },
      auth: {
        login: {
          title: "Welcome Back",
          subtitle: "Sign in to your account",
          email: "Email",
          password: "Password",
          submit: "Sign In",
          noAccount: "Don't have an account?",
          signUpLink: "Sign up"
        },
        signup: {
          title: "Create Account",
          subtitle: "Join our AI Academy",
          name: "Full Name",
          email: "Email",
          password: "Password",
          confirmPassword: "Confirm Password",
          submit: "Create Account",
          hasAccount: "Already have an account?",
          signInLink: "Sign in"
        }
      },
      footer: {
        rights: "All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        contact: "Contact"
      },
      profile: {
        title: "Profile",
        subtitle: "Manage your account settings and preferences",
        displayName: "Display Name",
        displayNamePlaceholder: "Enter your display name",
        email: "Email",
        photoURL: "Profile Picture URL",
        photoURLPlaceholder: "Enter URL for profile picture",
        noDisplayName: "No display name set",
        noPhotoURL: "No profile picture set",
        editProfile: "Edit Profile",
        cancel: "Cancel",
        save: "Save",
        saving: "Saving...",
        profileUpdated: "Profile Updated",
        profileUpdatedDesc: "Your profile has been successfully updated.",
        profileError: "Error",
        profileErrorDesc: "Failed to update profile. Please try again.",
        logoutSuccess: "Logged Out",
        logoutSuccessDesc: "You have been successfully logged out.",
        logoutError: "Logout Failed",
        logoutErrorDesc: "Failed to logout. Please try again.",
        profileInfo: "Profile Information",
        profileInfoDesc: "View and update your personal information",
        account: "Account",
        accountDesc: "Manage your account settings",
        usage: "Usage",
        usageDesc: "Your portal usage statistics",
        conversations: "Conversations",
        portals: "Active Portals",
        messages: "Messages"
      },
      settings: {
        title: "Settings",
        subtitle: "Manage your application preferences",
        preferences: "Preferences",
        preferencesDesc: "Customize your application experience",
        notifications: "Notifications",
        notificationsDesc: "Receive email notifications",
        darkMode: "Dark Mode",
        darkModeDesc: "Enable dark theme",
        language: "Language",
        languageDesc: "Select your preferred language",
        password: "Password",
        passwordDesc: "Change your password",
        currentPassword: "Current Password",
        newPassword: "New Password",
        confirmPassword: "Confirm New Password",
        changePassword: "Change Password",
        changing: "Changing...",
        passwordChanged: "Password Changed",
        passwordChangedDesc: "Your password has been successfully updated.",
        passwordError: "Password Change Failed",
        passwordErrorDesc: "Failed to change password. Please try again.",
        wrongPassword: "Current password is incorrect.",
        weakPassword: "New password is too weak. Please use a stronger password.",
        accountInfo: "Account Information",
        accountInfoDesc: "Your account details and security information",
        memberSince: "Member Since",
        lastLogin: "Last Login",
        email: "Email",
        userId: "User ID",
        saved: "Settings Saved",
        savedDesc: "Your settings have been successfully saved.",
        english: "English",
        german: "German",
        spanish: "Spanish",
        french: "French",
        savePreferences: "Save Preferences"
      }
    }
  },
  de: {
    translation: {
      nav: {
        akademie: "Akademie",
        login: "Anmelden",
        logoutError: "Abmeldung fehlgeschlagen",
        logoutSuccess: "Abgemeldet",
        logoutSuccessDesc: "Sie wurden erfolgreich abgemeldet."
      },
      hero: {
        title: "Erwachen",
        subtitle: "Ihre KI-Akademie",
        description: "Entdecken Sie die Macht der künstlichen Intelligenz durch unsere umfassende Akademie. Lernen, wachsen und transformieren Sie sich mit modernster KI-Bildung."
      },
      personas: {
        title: "KI-Personas",
        subtitle: "Wählen Sie Ihren Lernpfad",
        medical: {
          title: "Medizinische KI",
          subtitle: "Einfühlsame Fürsorge & Evidenzbasierte Beratung",
          description: "Fortgeschrittene Gesundheits-KI-Lösungen und medizinische Diagnosetraining.",
          features: {
            support: "🔮 Einfühlsame Unterstützung",
            advice: "⚕️ Evidenzbasierte Beratung",
            insights: "🧬 Präventive Einsichten"
          }
        },
        sales: {
          title: "Verkaufs-KI",
          subtitle: "Beratender Verkauf & Beziehungsaufbau",
          description: "Steigern Sie Ihre Verkaufsleistung mit KI-gesteuerten Strategien und Einblicken.",
          features: {
            value: "💰 Wertschöpfung",
            psychology: "🧠 Kundenpsychologie",
            objections: "📈 Einwandbehandlung"
          }
        },
        coaching: {
          title: "KI-Coaching",
          subtitle: "Emotionale Sicherheit & Persönliches Wachstum",
          description: "Persönlichkeitsentwicklung und Coaching verstärkt durch künstliche Intelligenz.",
          features: {
            growth: "🌟 Inneres Wachstum",
            resilience: "🎯 Emotionale Resilienz",
            reflection: "🔮 Geführte Reflexion"
          }
        },
        growth: {
          title: "Wachstums-KI",
          subtitle: "Digitales Business-Scaling & Marketingstrategie",
          description: "Beschleunigen Sie das Unternehmenswachstum mit datengesteuerten KI-Lösungen.",
          features: {
            scaling: "🌟 Business-Skalierung",
            strategy: "🎯 Marketingstrategie",
            insights: "🔮 Handlungsorientierte Einsichten"
          }
        }
      },
      archive: {
        title: "Wissensarchiv",
        subtitle: "Erkunden Sie unsere umfassende Bibliothek",
        description: "Greifen Sie auf Tausende von Ressourcen, Tutorials und Forschungsarbeiten in unserer ständig wachsenden Wissensbasis zu.",
        explore: "Archiv erkunden",
        items: {
          future: {
            title: "Zukunft der KI",
            description: "Entdecke Visionen und Prognosen über die Entwicklung der Mensch–KI-Zusammenarbeit."
          },
          algorithms: {
            title: "Kernalgorithmen", 
            description: "Enthülle die mathematischen Grundlagen, die Intelligenz und Wahrnehmung ermöglichen."
          },
          transformation: {
            title: "Praktische Transformation",
            description: "Erfahre, wie digitale Systeme reale Wirkung und Veränderung schaffen."
          }
        }
      },
      auth: {
        login: {
          title: "Willkommen zurück",
          subtitle: "Melden Sie sich in Ihrem Konto an",
          email: "E-Mail",
          password: "Passwort",
          submit: "Anmelden",
          noAccount: "Noch kein Konto?",
          signUpLink: "Registrieren"
        },
        signup: {
          title: "Konto erstellen",
          subtitle: "Treten Sie unserer KI-Akademie bei",
          name: "Vollständiger Name",
          email: "E-Mail",
          password: "Passwort",
          confirmPassword: "Passwort bestätigen",
          submit: "Konto erstellen",
          hasAccount: "Bereits ein Konto?",
          signInLink: "Anmelden"
        }
      },
      footer: {
        rights: "Alle Rechte vorbehalten.",
        privacy: "Datenschutzrichtlinie",
        terms: "Nutzungsbedingungen",
        contact: "Kontakt"
      },
      profile: {
        title: "Profil",
        subtitle: "Verwalten Sie Ihre Kontoeinstellungen und Präferenzen",
        displayName: "Anzeigename",
        displayNamePlaceholder: "Geben Sie Ihren Anzeigenamen ein",
        email: "E-Mail",
        photoURL: "Profilbild-URL",
        photoURLPlaceholder: "Geben Sie die URL für das Profilbild ein",
        noDisplayName: "Kein Anzeigename festgelegt",
        noPhotoURL: "Kein Profilbild festgelegt",
        editProfile: "Profil bearbeiten",
        cancel: "Abbrechen",
        save: "Speichern",
        saving: "Wird gespeichert...",
        profileUpdated: "Profil aktualisiert",
        profileUpdatedDesc: "Ihr Profil wurde erfolgreich aktualisiert.",
        profileError: "Fehler",
      }
    },
    archive: {
      title: "Wissensarchiv",
      subtitle: "Erkunden Sie unsere umfassende Bibliothek",
      description: "Greifen Sie auf Tausende von Ressourcen, Tutorials und Forschungsarbeiten in unserer ständig wachsenden Wissensbasis zu.",
      explore: "Archiv erkunden",
      items: {
        future: {
          title: "Zukunft der KI",
          description: "Entdecke Visionen und Prognosen über die Entwicklung der Mensch–KI-Zusammenarbeit."
        },
        algorithms: {
          title: "Kernalgorithmen", 
          description: "Enthülle die mathematischen Grundlagen, die Intelligenz und Wahrnehmung ermöglichen."
        },
        transformation: {
          title: "Praktische Transformation",
          description: "Erfahre, wie digitale Systeme reale Wirkung und Veränderung schaffen."
        }
      }
    },
    auth: {
      login: {
        title: "Willkommen zurück",
        subtitle: "Melden Sie sich in Ihrem Konto an",
        email: "E-Mail",
        password: "Passwort",
        submit: "Anmelden",
        noAccount: "Noch kein Konto?",
        signUpLink: "Registrieren"
      },
      signup: {
        title: "Konto erstellen",
        subtitle: "Treten Sie unserer KI-Akademie bei",
        name: "Vollständiger Name",
        email: "E-Mail",
        password: "Passwort",
        confirmPassword: "Passwort bestätigen",
        submit: "Konto erstellen",
        hasAccount: "Bereits ein Konto?",
        signInLink: "Anmelden"
      }
    },
    footer: {
      rights: "Alle Rechte vorbehalten.",
      privacy: "Datenschutzrichtlinie",
      terms: "Nutzungsbedingungen",
      contact: "Kontakt"
    },
    profile: {
      title: "Profil",
      subtitle: "Verwalten Sie Ihre Kontoeinstellungen und Präferenzen",
      displayName: "Anzeigename",
      displayNamePlaceholder: "Geben Sie Ihren Anzeigenamen ein",
      email: "E-Mail",
      photoURL: "Profilbild-URL",
      photoURLPlaceholder: "Geben Sie die URL für das Profilbild ein",
      noDisplayName: "Kein Anzeigename festgelegt",
      noPhotoURL: "Kein Profilbild festgelegt",
      editProfile: "Profil bearbeiten",
      cancel: "Abbrechen",
      save: "Speichern",
      saving: "Wird gespeichert...",
      profileUpdated: "Profil aktualisiert",
      profileUpdatedDesc: "Ihr Profil wurde erfolgreich aktualisiert.",
      profileError: "Fehler",
      profileErrorDesc: "Profil konnte nicht aktualisiert werden. Bitte versuchen Sie es erneut.",
      logoutSuccess: "Abgemeldet",
      logoutSuccessDesc: "Sie wurden erfolgreich abgemeldet.",
      logoutError: "Abmeldung fehlgeschlagen",
      logoutErrorDesc: "Abmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.",
      profileInfo: "Profilinformationen",
      profileInfoDesc: "Anzeigen und Aktualisieren Ihrer persönlichen Informationen",
      account: "Konto",
      accountDesc: "Verwalten Sie Ihre Kontoeinstellungen",
      usage: "Nutzung",
      usageDesc: "Ihre Portal-Nutzungsstatistiken",
      conversations: "Konversationen",
      portals: "Aktivierte Portale",
      messages: "Nachrichten"
    },
    settings: {
      title: "Einstellungen",
      subtitle: "Verwalten Sie Ihre Anwendungseinstellungen",
      preferences: "Präferenzen",
      preferencesDesc: "Passen Sie Ihr Anwendungserlebnis an",
      notifications: "Benachrichtigungen",
      notificationsDesc: "E-Mail-Benachrichtigungen erhalten",
      darkMode: "Dunkelmodus",
      darkModeDesc: "Dunkles Design aktivieren",
      language: "Sprache",
      languageDesc: "Wählen Sie Ihre bevorzugte Sprache",
      password: "Passwort",
      passwordDesc: "Ändern Sie Ihr Passwort",
      currentPassword: "Aktuelles Passwort",
      newPassword: "Neues Passwort",
      confirmPassword: "Neues Passwort bestätigen",
      changePassword: "Passwort ändern",
      changing: "Wird geändert...",
      passwordChanged: "Passwort geändert",
      passwordChangedDesc: "Ihr Passwort wurde erfolgreich aktualisiert.",
      passwordError: "Passwortänderung fehlgeschlagen",
      passwordErrorDesc: "Passwort konnte nicht geändert werden. Bitte versuchen Sie es erneut.",
      wrongPassword: "Aktuelles Passwort ist falsch.",
      weakPassword: "Neues Passwort ist zu schwach. Bitte verwenden Sie ein stärkeres Passwort.",
      accountInfo: "Kontoinformationen",
      accountInfoDesc: "Ihre Kontodetails und Sicherheitsinformationen",
      memberSince: "Mitglied seit",
      lastLogin: "Letzte Anmeldung",
      email: "E-Mail",
      userId: "Benutzer-ID",
      saved: "Einstellungen gespeichert",
      savedDesc: "Ihre Einstellungen wurden erfolgreich gespeichert.",
      english: "Englisch",
      german: "Deutsch",
      spanish: "Spanisch",
      french: "Französisch",
      savePreferences: "Einstellungen speichern"
    }
  },
  es: {
    translation: {
      nav: {
        akademie: "Academia",
        login: "Iniciar sesión",
        logoutError: "Error al cerrar sesión",
        logoutSuccess: "Sesión cerrada",
        logoutSuccessDesc: "Has cerrado sesión correctamente."
      },
      hero: {
        title: "Despertar",
        subtitle: "Tu Academia de IA",
        description: "Descubre el poder de la inteligencia artificial a través de nuestra academia integral. Aprende, crece y transforma con educación de IA de vanguardia."
      },
      personas: {
        title: "Personas de IA",
        subtitle: "Elige tu camino de aprendizaje",
        medical: {
          title: "IA Médica",
          subtitle: "Atención Compasiva y Asesoramiento Basado en Evidencia",
          description: "Soluciones avanzadas de IA para el cuidado de la salud y entrenamiento en diagnósticos médicos.",
          features: {
            support: "🔮 Apoyo Compasivo",
            advice: "⚕️ Asesoramiento Basado en Evidencia",
            insights: "🧬 Conocimientos Preventivos"
          }
        },
        sales: {
          title: "IA de Ventas",
          subtitle: "Venta Consultiva y Construcción de Relaciones",
          description: "Impulsa tu rendimiento de ventas con estrategias e insights impulsados por IA.",
          features: {
            value: "💰 Creación de Valor",
            psychology: "🧠 Psicología del Cliente",
            objections: "📈 Manejo de Objeciones"
          }
        },
        coaching: {
          title: "IA de Coaching",
          subtitle: "Seguridad Emocional y Crecimiento Personal",
          description: "Desarrollo personal y coaching mejorado por inteligencia artificial.",
          features: {
            growth: "🌟 Crecimiento Interior",
            resilience: "🎯 Resistencia Emocional",
            reflection: "🔮 Reflexión Guiada"
          }
        },
        growth: {
          title: "IA de Crecimiento",
          subtitle: "Escalado de Negocios Digitales y Estrategia de Marketing",
          description: "Acelera el crecimiento empresarial con soluciones de IA basadas en datos.",
          features: {
            scaling: "🌟 Escalado de Negocios",
            strategy: "🎯 Estrategia de Marketing",
            insights: "🔮 Insights Orientados a la Acción"
          }
        }
      },
      archive: {
        title: "Archivo de Conocimiento",
        subtitle: "Explora nuestra biblioteca integral",
        description: "Accede a miles de recursos, tutoriales y artículos de investigación en nuestra base de conocimiento en constante crecimiento.",
        explore: "Explorar Archivo",
        items: {
          future: {
            title: "Futuro de la IA",
            description: "Descubre visiones y predicciones sobre el desarrollo de la colaboración humano-IA."
          },
          algorithms: {
            title: "Algoritmos Centrales",
            description: "Desvela los fundamentos matemáticos que permiten la inteligencia y percepción."
          },
          transformation: {
            title: "Transformación Práctica",
            description: "Aprende cómo los sistemas digitales crean impacto real y cambio."
          }
        }
      },
      auth: {
        login: {
          title: "Bienvenido de Vuelta",
          subtitle: "Inicia sesión en tu cuenta",
          email: "Correo Electrónico",
          password: "Contraseña",
          submit: "Iniciar Sesión",
          noAccount: "¿No tienes una cuenta?",
          signUpLink: "Registrarse"
        },
        signup: {
          title: "Crear Cuenta",
          subtitle: "Únete a nuestra Academia de IA",
          name: "Nombre Completo",
          email: "Correo Electrónico",
          password: "Contraseña",
          confirmPassword: "Confirmar Contraseña",
          submit: "Crear Cuenta",
          hasAccount: "¿Ya tienes una cuenta?",
          signInLink: "Iniciar sesión"
        }
      },
      footer: {
        rights: "Todos los derechos reservados.",
        privacy: "Política de Privacidad",
        terms: "Términos de Servicio",
        contact: "Contacto"
      },
      profile: {
        title: "Perfil",
        subtitle: "Gestiona la configuración y preferencias de tu cuenta",
        displayName: "Nombre para mostrar",
        displayNamePlaceholder: "Ingresa tu nombre para mostrar",
        email: "Correo electrónico",
        photoURL: "URL de la imagen de perfil",
        photoURLPlaceholder: "Ingresa la URL para la imagen de perfil",
        noDisplayName: "No se ha establecido un nombre para mostrar",
        noPhotoURL: "No se ha establecido una imagen de perfil",
        editProfile: "Editar perfil",
        cancel: "Cancelar",
        save: "Guardar",
        saving: "Guardando...",
        profileUpdated: "Perfil actualizado",
        profileUpdatedDesc: "Tu perfil se ha actualizado correctamente.",
        profileError: "Error",
        profileErrorDesc: "No se pudo actualizar el perfil. Por favor, inténtalo de nuevo.",
        logoutSuccess: "Sesión cerrada",
        logoutSuccessDesc: "Has cerrado sesión correctamente.",
        logoutError: "Error al cerrar sesión",
        logoutErrorDesc: "No se pudo cerrar sesión. Por favor, inténtalo de nuevo.",
        profileInfo: "Información del perfil",
        profileInfoDesc: "Ver y actualizar tu información personal",
        account: "Cuenta",
        accountDesc: "Gestiona la configuración de tu cuenta",
        usage: "Uso",
        usageDesc: "Estadísticas de uso de tu portal",
        conversations: "Conversaciones",
        portals: "Portales activados",
        messages: "Mensajes"
      },
      settings: {
        title: "Configuración",
        subtitle: "Gestiona las preferencias de tu aplicación",
        preferences: "Preferencias",
        preferencesDesc: "Personaliza tu experiencia de aplicación",
        notifications: "Notificaciones",
        notificationsDesc: "Recibir notificaciones por correo electrónico",
        darkMode: "Modo oscuro",
        darkModeDesc: "Activar tema oscuro",
        language: "Idioma",
        languageDesc: "Selecciona tu idioma preferido",
        password: "Contraseña",
        passwordDesc: "Cambia tu contraseña",
        currentPassword: "Contraseña actual",
        newPassword: "Nueva contraseña",
        confirmPassword: "Confirmar nueva contraseña",
        changePassword: "Cambiar contraseña",
        changing: "Cambiando...",
        passwordChanged: "Contraseña cambiada",
        passwordChangedDesc: "Tu contraseña se ha actualizado correctamente.",
        passwordError: "Error al cambiar la contraseña",
        passwordErrorDesc: "No se pudo cambiar la contraseña. Por favor, inténtalo de nuevo.",
        wrongPassword: "La contraseña actual es incorrecta.",
        weakPassword: "La nueva contraseña es demasiado débil. Por favor, usa una contraseña más fuerte.",
        accountInfo: "Información de la cuenta",
        accountInfoDesc: "Detalles de tu cuenta e información de seguridad",
        memberSince: "Miembro desde",
        lastLogin: "Último inicio de sesión",
        email: "Correo electrónico",
        userId: "ID de usuario",
        saved: "Configuración guardada",
        savedDesc: "Tu configuración se ha guardado correctamente.",
        english: "Inglés",
        german: "Alemán",
        spanish: "Español",
        french: "Francés",
        savePreferences: "Guardar preferencias"
      }
    }
  },
  fr: {
    translation: {
      nav: {
        akademie: "Académie",
        login: "Se connecter",
        logoutError: "Échec de la déconnexion",
        logoutSuccess: "Déconnecté",
        logoutSuccessDesc: "Vous avez été déconnecté avec succès."
      },
      hero: {
        title: "Éveil",
        subtitle: "Votre Académie IA",
        description: "Découvrez la puissance de l'intelligence artificielle grâce à notre académie complète. Apprenez, grandissez et transformez-vous avec une éducation IA de pointe."
      },
      personas: {
        title: "Personas IA",
        subtitle: "Choisissez votre parcours d'apprentissage",
        medical: {
          title: "IA Médicale",
          subtitle: "Soins Compatissants et Conseil Fondé sur les Preuves",
          description: "Solutions IA avancées pour les soins de santé et formation aux diagnostics médicaux.",
          features: {
            support: "🔮 Soutien Compatissant",
            advice: "⚕️ Conseil Fondé sur les Preuves",
            insights: "🧬 Aperçus Préventifs"
          }
        },
        sales: {
          title: "IA de Vente",
          subtitle: "Vente Consultative et Construction de Relations",
          description: "Boostez vos performances de vente avec des stratégies et insights pilotés par l'IA.",
          features: {
            value: "💰 Création de Valeur",
            psychology: "🧠 Psychologie Client",
            objections: "📈 Gestion des Objections"
          }
        },
        coaching: {
          title: "IA de Coaching",
          subtitle: "Sécurité Émotionnelle et Croissance Personnelle",
          description: "Développement personnel et coaching améliorés par l'intelligence artificielle.",
          features: {
            growth: "🌟 Croissance Intérieure",
            resilience: "🎯 Résilience Émotionnelle",
            reflection: "🔮 Réflexion Guidée"
          }
        },
        growth: {
          title: "IA de Croissance",
          subtitle: "Mise à l'Échelle d'Entreprise Numérique et Stratégie Marketing",
          description: "Accélérez la croissance de l'entreprise avec des solutions IA basées sur les données.",
          features: {
            scaling: "🌟 Mise à l'Échelle d'Entreprise",
            strategy: "🎯 Stratégie Marketing",
            insights: "🔮 Insights Orientés Action"
          }
        }
      },
      archive: {
        title: "Archive de Connaissances",
        subtitle: "Explorez notre bibliothèque complète",
        description: "Accédez à des milliers de ressources, tutoriels et articles de recherche dans notre base de connaissances en constante croissance.",
        explore: "Explorer l'Archive",
        items: {
          future: {
            title: "Futur de l'IA",
            description: "Découvrez les visions et prédictions sur le développement de la collaboration humain-IA."
          },
          algorithms: {
            title: "Algorithmes Centraux",
            description: "Dévoilez les fondements mathématiques qui permettent l'intelligence et la perception."
          },
          transformation: {
            title: "Transformation Pratique",
            description: "Apprenez comment les systèmes numériques créent un impact réel et du changement."
          }
        }
      },
      auth: {
        login: {
          title: "Bon Retour",
          subtitle: "Connectez-vous à votre compte",
          email: "Email",
          password: "Mot de Passe",
          submit: "Se Connecter",
          noAccount: "Vous n'avez pas de compte ?",
          signUpLink: "S'inscrire"
        },
        signup: {
          title: "Créer un Compte",
          subtitle: "Rejoignez notre Académie IA",
          name: "Nom Complet",
          email: "Email",
          password: "Mot de Passe",
          confirmPassword: "Confirmer le Mot de Passe",
          submit: "Créer un Compte",
          hasAccount: "Vous avez déjà un compte ?",
          signInLink: "Se connecter"
        }
      },
      footer: {
        rights: "Tous droits réservés.",
        privacy: "Politique de Confidentialité",
        terms: "Conditions d'Utilisation",
        contact: "Contact"
      },
      profile: {
        title: "Profil",
        subtitle: "Gérez les paramètres et préférences de votre compte",
        displayName: "Nom d'affichage",
        displayNamePlaceholder: "Entrez votre nom d'affichage",
        email: "Email",
        photoURL: "URL de la photo de profil",
        photoURLPlaceholder: "Entrez l'URL de la photo de profil",
        noDisplayName: "Aucun nom d'affichage défini",
        noPhotoURL: "Aucune photo de profil définie",
        editProfile: "Modifier le profil",
        cancel: "Annuler",
        save: "Enregistrer",
        saving: "Enregistrement...",
        profileUpdated: "Profil mis à jour",
        profileUpdatedDesc: "Votre profil a été mis à jour avec succès.",
        profileError: "Erreur",
        profileErrorDesc: "Échec de la mise à jour du profil. Veuillez réessayer.",
        logoutSuccess: "Déconnecté",
        logoutSuccessDesc: "Vous avez été déconnecté avec succès.",
        logoutError: "Échec de la déconnexion",
        logoutErrorDesc: "Échec de la déconnexion. Veuillez réessayer.",
        profileInfo: "Informations du profil",
        profileInfoDesc: "Afficher et mettre à jour vos informations personnelles",
        account: "Compte",
        accountDesc: "Gérez les paramètres de votre compte",
        usage: "Utilisation",
        usageDesc: "Statistiques d'utilisation de votre portail",
        conversations: "Conversations",
        portals: "Portails activés",
        messages: "Messages"
      },
      settings: {
        title: "Paramètres",
        subtitle: "Gérez les préférences de votre application",
        preferences: "Préférences",
        preferencesDesc: "Personnalisez votre expérience d'application",
        notifications: "Notifications",
        notificationsDesc: "Recevoir des notifications par email",
        darkMode: "Mode sombre",
        darkModeDesc: "Activer le thème sombre",
        language: "Langue",
        languageDesc: "Sélectionnez votre langue préférée",
        password: "Mot de passe",
        passwordDesc: "Changez votre mot de passe",
        currentPassword: "Mot de passe actuel",
        newPassword: "Nouveau mot de passe",
        confirmPassword: "Confirmer le nouveau mot de passe",
        changePassword: "Changer le mot de passe",
        changing: "Changement...",
        passwordChanged: "Mot de passe changé",
        passwordChangedDesc: "Votre mot de passe a été mis à jour avec succès.",
        passwordError: "Échec du changement de mot de passe",
        passwordErrorDesc: "Échec du changement de mot de passe. Veuillez réessayer.",
        accountInfo: "Informations du compte",
        accountInfoDesc: "Détails de votre compte et informations de sécurité",
        memberSince: "Membre depuis",
        lastLogin: "Dernière connexion",
        email: "Email",
        userId: "ID utilisateur",
        saved: "Paramètres enregistrés",
        savedDesc: "Vos paramètres ont été enregistrés avec succès.",
        english: "Anglais",
        german: "Allemand",
        spanish: "Espagnol",
        french: "Français",
        savePreferences: "Enregistrer les préférences"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;