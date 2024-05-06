import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NewsletterComponent } from "../../components/newsletter/newsletter.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { GalleryComponent } from "../../components/gallery/gallery.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [NavbarComponent, NewsletterComponent, FooterComponent, GalleryComponent, TranslateModule]
})
export class HomeComponent {

}
