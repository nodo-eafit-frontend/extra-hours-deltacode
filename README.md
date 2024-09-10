# extra-hours-deltacode

Wireframes
https://miro.com/app/board/uXjVKxUM7T8=/?moveToWidget=3458764597049633884&cot=14
https://www.figma.com/design/QdMm6JmxJ7tPx4XKkLhXLB/Extra-Hours-Delta?node-id=0-1&m=dev&t=o7T4U9zHz9zgULpy-1

 # **MANUAL DE USUSARIO**
 
## **Introducción**

Este manual de usuario está diseñado para guiar a los administradores y gerentes en el uso del sistema de gestión de horas extra. El sistema permite agregar horas extra, actualizar y eliminar, aprobar y pagar horas extra, así como generar informes detallados.

## **Requisitos**

Antes de ejecutar la aplicación, asegurate de tener instalados:

+ Node.js
+ npm

Instala las dependencias tanto en la carpeta client como en la carpeta server:

+ npm install
+ cors: para habilitar el intercambio de recursos de orígenes cruzados (CORS).
+ dotenv: para gestionar variables de entorno.
+ exceljs: para generar y manipular archivos Excel.
+ express: un framework minimalista para el servidor backend.

## **Ejecuta el proyecto**

### **Cliente:** Desde la carpeta client, ejecuta el siguiente comando para iniciar el servidor de desarrollo del frontend:

npm run dev

### **Servidor:** Desde la carpeta server, ejecuta el siguiente comando para iniciar el servidor backend:

npm run serve


## **Funcionalidades Principales**

### 1. **Agregar Horas Extra**
   
##### **Perfil**: Administrador
##### **Acción**: Agregar nueva hora extra
##### **Campos Requeridos:**
#### ID Empleado
#### Fecha
#### Tipo de hora extra (Diurna, Nocturna, Festiva Diurna, Festiva Nocturna)
#### Observaciones

### 2. **Actualizar y Eliminar Horas Extra**
   
##### **Perfil**: Administrador
##### **Acción**: Actualizar hora extra existente
##### **Campos Requeridos**:
##### ID Empleado
##### Gestiona el registro desde los botones editar o eliminar según corresponda.


## 3.  **Aprobar Horas Extra**

##### **Perfil**: Nómina
##### **Acción**: Aprobar registros de horas extra
##### **Campos Requeridos**:
##### ID Empleado
##### Gestiona el registro a aprobar desde el botón correspondiente.

## 4.  **Pagar Horas Extra**

##### **Perfil**: Nómina
##### **Acción**: Pagar registros de horas extra aprobados.
##### **Campos Requeridos**:
##### ID Empleado
##### Gestiona el pago desde el botón correspondiente al registro a pagar.

## 5. **Generar Informes**
   
##### **Perfil**: Administrador
##### **Acción**: Generar y descargar informes
##### **Campos Requeridos**:
##### ID Empleado para generar reportes por empleado
##### Rango de fecha (Inicial y Final), para generar reportes de todos los registros abarcados en las fechas ingresadas.

## 6.  **Configuración de Política de Horas Extra**
 
##### **Perfil**: Jefes
##### **Acción**: Configurar la política de horas extra
##### **Campos Requeridos**:
##### Valor porcentaje diurno
##### Valor porcentaje nocturno
##### Valor porcentaje festivo diurno
##### Valor porcentaje festivo nocturno


## **Perfiles Administrativos**

**Gerente**

**Sección Informes**: Genera y descarga informes.

**Sección Actualiza y Eliminar**: Actualiza o elimina las horas extra existentes no pagadas.

**Sección Agregar**: Agrega hora extra.

**Nómina**

**Sección Aprobar**: Aprueba los registros de horas extra.

**Sección Pagar**: Paga los registros de horas extra aprobados.

## **Conclusión**
Este manual proporciona una guía completa para la gestión de horas extra en el sistema. Siga las instrucciones detalladas para realizar cada acción de manera eficiente y asegúrese de completar todos los campos requeridos para un registro preciso y efectivo.
