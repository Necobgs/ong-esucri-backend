import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigurationService } from '../configuration/configuration.service';
import { module_name } from 'src/configuration/configuration.enum';
import { stringify } from 'querystring';
import { EmailDto } from './dtos/email.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Request, Response } from 'express';

@Injectable()
export class EmailService {

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly mailerService:MailerService,
        private readonly configService:ConfigurationService,
    ){
        this.updateEmailConfigs()
    }

    async sendToContact(dto:EmailDto){
        const htmlConfig     = await this.configService.findOneByKey('email_template_contact')
        const subjectConfig  = await this.configService.findOneByKey('email_subject_contact')
        const emailConfigSender   = await this.configService.findOneByKey('email_adress_sender')

        if (!htmlConfig || !subjectConfig || !emailConfigSender) {
            throw new Error('Uma ou mais configurações de e-mail não foram encontradas');
        }

        await this.mailerService.sendMail({
            transporterName:'default',
            from: emailConfigSender.value,
            to:dto.email_contact,
            subject:subjectConfig.value,
            html:htmlConfig.value
        })
    }

    async sendToOng(dto:EmailDto,req:Request,res:Response){
        const cache_key = `email_cache_${req.ip}_${dto.email_contact}`;
        console.log(cache_key);
        if(await this.cacheManager.get(cache_key)) return res.json({sucess:false,message:"Aguarde pelo menos 10 minutos antes de enviar o próximo email de contato"});
        const emailConfigSender   = await this.configService.findOneByKey('email_adress_sender')
        const emailConfigReceiver = await this.configService.findOneByKey('email_adress_receiver')

        if (!emailConfigReceiver || !emailConfigSender) {
            throw new Error('Uma ou mais configurações de e-mail não foram encontradas');
        }

        let html = "<h1>Novo contato!</h1><p>Nome: {{nome}}<br>Email: {{email}}<br>Mensagem: {{mensagem}}</p>"
        html = html.replaceAll('{{email}}',dto.email_contact)
        html = html.replaceAll('{{mensagem}}',dto.message)
        html = html.replaceAll('{{nome}}',dto.name)

        await this.mailerService.sendMail({
            transporterName:'default',
            from: emailConfigSender?.value,
            to:emailConfigReceiver?.value,
            subject:dto.subject,
            html
        })
        await this.sendToContact(dto)
        await this.cacheManager.set(cache_key,true,1000 * 60 * 10)
        return res.json({sucess:true})
    }

    async updateEmailConfigs(){
        const hostConfig          = await this.configService.findOneByKey('email_host')
        const passwConfig         = await this.configService.findOneByKey('email_passw')
        const emailConfigSender   = await this.configService.findOneByKey('email_adress_sender')
        if (!hostConfig || !emailConfigSender || !passwConfig) {
            throw new Error('Uma ou mais configurações de e-mail não foram encontradas');
        }
        const string_transporter = `smtps://${emailConfigSender.value}:${encodeURIComponent(passwConfig.value)}@${hostConfig.value}`

        this.mailerService.addTransporter('default',string_transporter)
    }

}
